#!/usr/bin/env node

/**
 * Seed Design System - Vendoring CLI
 *
 * Copies design system source files into a Next.js project.
 * One command: components, tokens, config, skill, and dependencies.
 *
 * Usage:
 *   node ~/Code/nadicode-design-system/bin/init.mjs [flags]
 *
 * Flags:
 *   --update     Re-copy all source files and re-install deps
 *   --force      Skip confirmation prompts
 *   --skip-deps  Skip npm install
 *   --help       Show help
 */

import {
  readFileSync, writeFileSync, mkdirSync, existsSync,
  copyFileSync, readdirSync, statSync, symlinkSync, rmSync,
} from 'node:fs'
import { join, dirname, relative, resolve } from 'node:path'
import { execSync } from 'node:child_process'
import { createInterface } from 'node:readline'

const DS_ROOT = resolve(dirname(new URL(import.meta.url).pathname), '..')
const TARGET = process.cwd()

const args = process.argv.slice(2)
const UPDATE = args.includes('--update')
const FORCE = args.includes('--force')
const SKIP_DEPS = args.includes('--skip-deps')

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
  Seed Design System - Vendoring CLI

  Copies the full design system into a Next.js project:
  components, blocks, icons, tokens, config, and agent skill.

  Usage:
    node ${process.argv[1]} [flags]

  Flags:
    --update     Re-copy all source files, re-install deps
    --force      Skip confirmation prompts
    --skip-deps  Skip dependency installation
    --help       Show this help message
  `)
  process.exit(0)
}

// ─── Output helpers ─────────────────────────────────────────

const c = {
  reset: '\x1b[0m', bold: '\x1b[1m', dim: '\x1b[2m',
  green: '\x1b[32m', yellow: '\x1b[33m', cyan: '\x1b[36m', red: '\x1b[31m',
}

const log = (s) => console.log(s)
const ok = (s) => log(`  ${c.green}+${c.reset} ${s}`)
const warn = (s) => log(`  ${c.yellow}!${c.reset} ${s}`)
const info = (s) => log(`  ${c.cyan}>${c.reset} ${s}`)
const fail = (s) => { log(`\n  ${c.red}Error: ${s}${c.reset}\n`); process.exit(1) }

async function confirm(question) {
  if (FORCE || UPDATE) return true
  const rl = createInterface({ input: process.stdin, output: process.stdout })
  return new Promise((r) => {
    rl.question(`  ${question} [y/N] `, (a) => {
      rl.close()
      r(a.trim().toLowerCase() === 'y')
    })
  })
}

// ─── Validation ─────────────────────────────────────────────

function validate() {
  const pkgPath = join(TARGET, 'package.json')
  if (!existsSync(pkgPath))
    fail('No package.json found. Run this from a Next.js project root.')

  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))
  const allDeps = { ...pkg.dependencies, ...pkg.devDependencies }
  if (!allDeps.next)
    fail('Not a Next.js project (missing "next" dependency).')

  return pkg
}

function detectLayout() {
  if (existsSync(join(TARGET, 'src', 'app')))
    return { appDir: 'src/app', hasSrc: true }
  if (existsSync(join(TARGET, 'app')))
    return { appDir: 'app', hasSrc: false }
  // Default: create src/app
  return { appDir: 'src/app', hasSrc: true }
}

// ─── File copying ───────────────────────────────────────────

const SKIP_RE = [/\.test\.[jt]sx?$/, /\.spec\.[jt]sx?$/, /__tests__/]

function shouldSkip(name) {
  return SKIP_RE.some((re) => re.test(name))
}

/**
 * Recursively copy directory, excluding test files.
 * Source files already have "use client" directives, so this is a plain copy.
 */
function copyDir(src, dest) {
  if (!existsSync(src)) return 0
  mkdirSync(dest, { recursive: true })
  let count = 0

  for (const name of readdirSync(src)) {
    const from = join(src, name)
    const to = join(dest, name)

    if (statSync(from).isDirectory()) {
      count += copyDir(from, to)
      continue
    }

    if (shouldSkip(name)) continue
    copyFileSync(from, to)
    count++
  }

  return count
}

// ─── Step 1: Copy source files ──────────────────────────────

function copySources() {
  info('Copying source files...')
  let total = 0
  const s = (dir) => join(DS_ROOT, 'src', dir)
  const d = (dir) => join(TARGET, 'src', dir)

  // Component directories
  for (const dir of [
    'components/ui',
    'components/blocks',
    'components/layout',
    'components/logos',
    'components/animate-ui',
  ]) {
    total += copyDir(s(dir), d(dir))
  }

  // Hooks
  total += copyDir(s('hooks'), d('hooks'))

  // Lib (utils, ThemeProvider, tokens, motion, etc.)
  total += copyDir(s('lib'), d('lib'))

  // tokens.ts (root-level type re-export)
  const tokensFile = join(DS_ROOT, 'src', 'tokens.ts')
  if (existsSync(tokensFile)) {
    mkdirSync(join(TARGET, 'src'), { recursive: true })
    copyFileSync(tokensFile, join(TARGET, 'src', 'tokens.ts'))
    total++
  }

  ok(`${total} source files`)
  return total
}

// ─── Step 2: Copy fonts ─────────────────────────────────────

function copyFonts() {
  const fontsRoot = join(DS_ROOT, 'public', 'fonts')
  if (!existsSync(fontsRoot)) return

  let count = 0
  for (const family of readdirSync(fontsRoot)) {
    const src = join(fontsRoot, family)
    if (!statSync(src).isDirectory()) continue
    const dest = join(TARGET, 'public', 'fonts', family)
    mkdirSync(dest, { recursive: true })
    for (const f of readdirSync(src)) {
      copyFileSync(join(src, f), join(dest, f))
      count++
    }
  }
  ok(`${count} font files`)
}

// ─── Step 3: Copy agent skill + symlink to tool dirs ────────

function copySkill() {
  // Canonical source is .agents/skills/ (falls back to .claude/skills/ for compat)
  let src = join(DS_ROOT, '.agents', 'skills', 'seed-design-system')
  if (!existsSync(src)) src = join(DS_ROOT, '.claude', 'skills', 'seed-design-system')
  if (!existsSync(src)) { warn('Skill directory not found'); return }

  // Copy to .agents/skills/ (canonical location)
  const agentsDest = join(TARGET, '.agents', 'skills', 'seed-design-system')
  const count = copyDir(src, agentsDest)
  ok(`Agent skill (${count} files) -> .agents/skills/`)

  // Symlink from each tool's skills dir to .agents/skills/seed-design-system
  const symTarget = join('..', '..', '.agents', 'skills', 'seed-design-system')
  for (const tool of ['.claude', '.codex', '.opencode']) {
    const toolSkillDir = join(TARGET, tool, 'skills')
    const linkPath = join(toolSkillDir, 'seed-design-system')

    mkdirSync(toolSkillDir, { recursive: true })

    // Remove existing (file, dir, or stale symlink)
    if (existsSync(linkPath) || lstatSafe(linkPath)) {
      rmSync(linkPath, { recursive: true, force: true })
    }

    try {
      symlinkSync(symTarget, linkPath)
      ok(`${tool}/skills/seed-design-system -> .agents/ (symlink)`)
    } catch {
      warn(`Could not create symlink at ${tool}/skills/`)
    }
  }
}

function lstatSafe(p) {
  try { return statSync(p, { throwIfNoEntry: false }) } catch { return null }
}

// ─── Step 4: Setup CSS ──────────────────────────────────────

function setupCSS(appDir) {
  // Build seed-tokens.css from index.css (stripped of Tailwind directives)
  const seedDest = join(TARGET, 'src', 'seed-tokens.css')
  let css = readFileSync(join(DS_ROOT, 'src', 'index.css'), 'utf8')

  // Remove Tailwind directives (these belong in globals.css)
  css = css.replace(/^@import\s+"tailwindcss";\s*\n/m, '')
  css = css.replace(/^@custom-variant\s+[^\n]+\n/m, '')
  css = css.replace(/^@config\s+[^\n]+\n/m, '')

  mkdirSync(dirname(seedDest), { recursive: true })
  writeFileSync(seedDest, css)
  ok('src/seed-tokens.css (design tokens + glass + keyframes)')

  // Patch globals.css: add Tailwind directives + seed import
  const globalsPath = join(TARGET, appDir, 'globals.css')
  const globalsDir = join(TARGET, appDir)
  let globals = existsSync(globalsPath) ? readFileSync(globalsPath, 'utf8') : ''

  // Relative paths from globals.css location
  const seedRel = relative(globalsDir, seedDest).replace(/\\/g, '/')
  const configRel = relative(globalsDir, join(TARGET, 'tailwind.config.js')).replace(/\\/g, '/')

  // Build the correct directive order: @import tailwindcss must come first
  const hasTw = globals.includes('@import "tailwindcss"')
  const hasVariant = globals.includes('@custom-variant dark')
  const hasConfig = globals.includes('@config')
  const hasSeed = globals.includes('seed-tokens')

  if (!hasTw || !hasVariant || !hasConfig || !hasSeed) {
    mkdirSync(globalsDir, { recursive: true })

    // Strip existing @import "tailwindcss" line (we'll re-add it at the top)
    let body = globals.replace(/^@import\s+"tailwindcss";\s*\n?/m, '').trim()

    // Build header with correct order
    const header = [
      '@import "tailwindcss";',
      hasVariant ? null : '@custom-variant dark (&:is(.dark *));',
      hasConfig ? null : `@config "${configRel}";`,
      hasSeed ? null : `@import "${seedRel}";`,
    ].filter(Boolean).join('\n')

    globals = header + (body ? '\n\n' + body : '') + '\n'
    writeFileSync(globalsPath, globals)
    ok('globals.css')
  } else {
    ok('globals.css already configured')
  }
}

// ─── Step 5: Tailwind config ────────────────────────────────

function setupTailwind() {
  const dest = join(TARGET, 'tailwind.config.js')

  // Don't overwrite user's config on fresh install unless forced
  if (existsSync(dest) && !UPDATE && !FORCE) {
    warn('tailwind.config.js already exists (use --update to overwrite)')
    return
  }

  let config = readFileSync(join(DS_ROOT, 'tailwind.config.js'), 'utf8')

  // Patch content paths for Next.js
  config = config.replace(
    /content:\s*\[[\s\S]*?\]/,
    [
      'content: [',
      '    "./src/**/*.{js,ts,jsx,tsx}",',
      '    "./app/**/*.{js,ts,jsx,tsx}",',
      '    "./components/**/*.{js,ts,jsx,tsx}",',
      '  ]',
    ].join('\n')
  )

  writeFileSync(dest, config)
  ok('tailwind.config.js')
}

// ─── Step 6: PostCSS config ─────────────────────────────────

function setupPostCSS() {
  const variants = ['postcss.config.mjs', 'postcss.config.js', 'postcss.config.cjs']
  const existing = variants.find((v) => existsSync(join(TARGET, v)))

  if (existing && !UPDATE && !FORCE) {
    ok(`${existing} already exists`)
    return
  }

  writeFileSync(
    join(TARGET, 'postcss.config.mjs'),
    `export default {\n  plugins: {\n    '@tailwindcss/postcss': {},\n  },\n}\n`
  )
  ok('postcss.config.mjs')
}

// ─── Step 7: TypeScript config ──────────────────────────────

function parseJsonc(text) {
  return JSON.parse(
    text
      .replace(/\/\/[^\n]*/g, '')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/,(\s*[}\]])/g, '$1')
  )
}

function patchTsConfig() {
  const tsPath = join(TARGET, 'tsconfig.json')
  if (!existsSync(tsPath)) { warn('No tsconfig.json found'); return }

  const raw = readFileSync(tsPath, 'utf8')
  let config
  try {
    config = parseJsonc(raw)
  } catch {
    warn('Could not parse tsconfig.json, skipping @/* alias')
    return
  }

  const co = config.compilerOptions || {}
  const paths = co.paths || {}

  if (paths['@/*']) {
    ok('tsconfig.json @/* alias already set')
    return
  }

  co.paths = { ...paths, '@/*': ['./src/*'] }
  config.compilerOptions = co
  writeFileSync(tsPath, JSON.stringify(config, null, 2) + '\n')
  ok('tsconfig.json (@/* path alias)')
}

// ─── Step 8: Write .seed-version ────────────────────────────

function writeSeedVersion() {
  let commit = 'unknown'
  try {
    commit = execSync('git rev-parse --short HEAD', {
      cwd: DS_ROOT, encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'],
    }).trim()
  } catch {
    warn('Could not read DS git commit')
  }

  writeFileSync(join(TARGET, '.seed-version'), commit + '\n')
  ok(`.seed-version (${commit})`)
}

// ─── Step 9: Agent CLAUDE.md ────────────────────────────────

const SEED_SECTION = `# Provenance

This project uses the [Nadicode Design System](https://github.com/vadimcomanescu/nadicode-design-system) (Seed).

- **Vendored commit**: see \`.seed-version\` in project root
- **Update**: clone the DS repo, then run \`node <ds-path>/bin/init.mjs --update\`
- **What updates**: components, tokens, icons, blocks, hooks, agent skill, CSS
- **What it won't touch**: your app routes, layouts, pages, or custom components

After updating, run \`npm test\` to verify integrity gates still pass.

# Seed Design System

Read the skill before working with UI:
\`.agents/skills/seed-design-system/SKILL.md\`

## Rules

- Import icons from \`@/components/ui/icons/\`, NEVER from \`lucide-react\` directly
- Use semantic tokens (\`bg-background\`, \`text-text-primary\`), never hardcoded colors
- All containers use glass effects: \`glass-panel\`, \`glass-floating\`, \`glass-overlay\`
- Use \`cn()\` from \`@/lib/utils\` for class merging
- Components follow the Radix + CVA + forwardRef pattern
- Theme: light/dark/bloom via CSS variables and \`next-themes\`
- Root layout needs a client-component wrapper with \`<ThemeProvider>\` from \`@/lib/ThemeProvider\`

## Discovery

\`\`\`bash
ls src/components/ui/          # Primitives
ls src/components/blocks/      # Composed blocks
ls src/components/ui/icons/    # Animated icons
ls src/components/ui/charts/   # Chart components
\`\`\`
`

function generateAgentMd() {
  // Write/update agent instructions in each tool's config dir
  // .claude/CLAUDE.md, .codex/AGENTS.md, .opencode/AGENTS.md
  const targets = [
    { dir: '.claude', file: 'CLAUDE.md' },
    { dir: '.codex', file: 'AGENTS.md' },
    { dir: '.opencode', file: 'AGENTS.md' },
  ]

  for (const { dir, file } of targets) {
    const dest = join(TARGET, dir, file)
    mkdirSync(dirname(dest), { recursive: true })

    if (existsSync(dest)) {
      const existing = readFileSync(dest, 'utf8')
      if (existing.includes('Seed Design System') || existing.includes('Nadicode Design System')) {
        if (UPDATE) {
          // Strip old provenance + seed sections, replace with new template
          let updated = existing.replace(
            /# Provenance[\s\S]*?(?=\n# (?!Seed|Provenance)|$)/,
            ''
          ).replace(
            /# Seed Design System[\s\S]*?(?=\n# (?!Seed)|$)/,
            ''
          ).trim()
          updated = SEED_SECTION + updated + '\n'
          writeFileSync(dest, updated)
          ok(`${dir}/${file} (updated Seed section)`)
        } else {
          ok(`${dir}/${file} already has Seed instructions`)
        }
        continue
      }
      writeFileSync(dest, existing.trimEnd() + '\n\n' + SEED_SECTION)
      ok(`${dir}/${file} (appended Seed section)`)
      continue
    }

    writeFileSync(dest, SEED_SECTION)
    ok(`${dir}/${file}`)
  }
}

// ─── Step 9: Install dependencies ───────────────────────────

const DEPS = [
  // Core styling
  'class-variance-authority', 'clsx', 'tailwind-merge',
  // Radix UI primitives
  '@radix-ui/react-accordion', '@radix-ui/react-alert-dialog',
  '@radix-ui/react-aspect-ratio', '@radix-ui/react-avatar',
  '@radix-ui/react-checkbox', '@radix-ui/react-collapsible',
  '@radix-ui/react-context-menu', '@radix-ui/react-dialog',
  '@radix-ui/react-dropdown-menu', '@radix-ui/react-hover-card',
  '@radix-ui/react-label', '@radix-ui/react-menubar',
  '@radix-ui/react-navigation-menu', '@radix-ui/react-popover',
  '@radix-ui/react-progress', '@radix-ui/react-radio-group',
  '@radix-ui/react-scroll-area', '@radix-ui/react-select',
  '@radix-ui/react-separator', '@radix-ui/react-slider',
  '@radix-ui/react-slot', '@radix-ui/react-switch',
  '@radix-ui/react-tabs', '@radix-ui/react-toast',
  '@radix-ui/react-toggle', '@radix-ui/react-toggle-group',
  '@radix-ui/react-tooltip',
  // Animation
  'motion', 'lucide-react',
  // Forms
  'react-hook-form', '@hookform/resolvers', 'zod',
  // Charts
  'recharts',
  // Date
  'date-fns', 'react-day-picker',
  // UI components
  'cmdk', 'embla-carousel-react', 'input-otp', 'sonner', 'vaul',
  // Table
  '@tanstack/react-table',
  // Layout
  'react-resizable-panels', 'react-use-measure',
  // Theme
  'next-themes',
  // Code highlighting
  'prismjs',
  // Stripe (checkout components)
  '@stripe/react-stripe-js', '@stripe/stripe-js',
  // 3D backgrounds (Vanta)
  'three', 'vanta',
  // Canvas
  'p5',
]

const DEV_DEPS = [
  'tailwindcss', '@tailwindcss/postcss', 'tailwindcss-animate',
  '@types/prismjs', '@types/three',
]

function installDeps() {
  if (SKIP_DEPS) { info('Skipping deps (--skip-deps)'); return }

  // Detect package manager
  let pm = 'npm'
  if (existsSync(join(TARGET, 'pnpm-lock.yaml'))) pm = 'pnpm'
  else if (existsSync(join(TARGET, 'yarn.lock'))) pm = 'yarn'
  else if (existsSync(join(TARGET, 'bun.lockb')) || existsSync(join(TARGET, 'bun.lock'))) pm = 'bun'

  const add = pm === 'npm' ? 'install' : 'add'
  const devFlag = pm === 'npm' ? '--save-dev' : '-D'

  info(`Installing ${DEPS.length + DEV_DEPS.length} packages with ${pm}...`)

  try {
    execSync(`${pm} ${add} ${DEPS.join(' ')}`, {
      cwd: TARGET, stdio: 'pipe', timeout: 180_000,
    })
    ok(`${DEPS.length} runtime dependencies`)
  } catch {
    warn('Some runtime deps failed to install. Run install manually.')
  }

  try {
    execSync(`${pm} ${add} ${devFlag} ${DEV_DEPS.join(' ')}`, {
      cwd: TARGET, stdio: 'pipe', timeout: 60_000,
    })
    ok(`${DEV_DEPS.length} dev dependencies`)
  } catch {
    warn('Some dev deps failed to install. Run install manually.')
  }
}

// ─── Main ───────────────────────────────────────────────────

async function main() {
  log(`\n${c.bold}  Seed Design System${c.reset} ${c.dim}init${c.reset}\n`)

  validate()
  const { appDir } = detectLayout()

  info(`Project: ${TARGET}`)
  info(`App dir: ${appDir}`)
  info(`Mode: ${UPDATE ? 'update' : FORCE ? 'force' : 'install'}`)
  log('')

  // Confirm overwrite on fresh install
  if (!UPDATE && !FORCE && existsSync(join(TARGET, 'src', 'components', 'ui'))) {
    const yes = await confirm('Seed components already exist. Overwrite?')
    if (!yes) { log('\n  Aborted.\n'); process.exit(0) }
  }

  copySources()
  copyFonts()
  copySkill()
  log('')
  setupCSS(appDir)
  setupTailwind()
  setupPostCSS()
  patchTsConfig()
  writeSeedVersion()
  generateAgentMd()
  log('')
  installDeps()

  log(`\n${c.bold}${c.green}  Done!${c.reset}\n`)
  log('  Next steps:')
  log(`    1. Create a client-component wrapper with ${c.cyan}<ThemeProvider>${c.reset} from ${c.dim}@/lib/ThemeProvider${c.reset}`)
  log(`    2. Wrap your root layout children with it`)
  log(`    3. Make sure ${c.dim}globals.css${c.reset} is imported in your root layout`)
  log(`    4. Run ${c.cyan}npm run dev${c.reset} to verify`)
  log('')
  log(`  To update later:`)
  log(`    ${c.dim}node ${DS_ROOT}/bin/init.mjs --update${c.reset}`)
  log('')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
