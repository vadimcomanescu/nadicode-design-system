#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync } from "node:fs"
import { dirname, join } from "node:path"

const root = process.cwd()

function walk(dir, matcher, acc = []) {
  if (!existsSync(dir)) return acc
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const next = join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(next, matcher, acc)
      continue
    }
    if (matcher(next)) acc.push(next)
  }
  return acc
}

let docFiles = [
  join(root, "README.md"),
  join(root, "AGENTS.md"),
  ...walk(join(root, "docs"), (p) => p.endsWith(".md")),
  ...walk(join(root, ".agents", "skills", "seed-design-system"), (p) => p.endsWith(".md")),
]
const scaffoldRoot = join(root, "apps", "scaffold")

if (existsSync(scaffoldRoot)) {
  docFiles.push(join(scaffoldRoot, "AGENTS.md"))
  docFiles.push(...walk(join(scaffoldRoot, "docs", "nadicode"), (p) => p.endsWith(".md")))
  docFiles.push(
    ...walk(join(scaffoldRoot, ".agents", "skills", "seed-design-system"), (p) => p.endsWith(".md"))
  )
}
docFiles = [...new Set(docFiles)]

const issues = []

function addIssue(file, message) {
  issues.push({ file: file.replace(`${root}/`, ""), message })
}

function compareMirroredFile(sourceRelativePath, targetRelativePath) {
  const sourcePath = join(root, sourceRelativePath)
  const targetPath = join(root, targetRelativePath)

  if (!existsSync(sourcePath)) return
  if (!existsSync(targetPath)) {
    addIssue(targetPath, `missing mirrored file (must match \`${sourceRelativePath}\`)`)
    return
  }

  const sourceContent = readFileSync(sourcePath, "utf8")
  const targetContent = readFileSync(targetPath, "utf8")
  if (sourceContent !== targetContent) {
    addIssue(targetPath, `drift from source-of-truth \`${sourceRelativePath}\``)
  }
}

function compareMirroredMarkdownTree(sourceRelativeDir, targetRelativeDir) {
  const sourceDir = join(root, sourceRelativeDir)
  if (!existsSync(sourceDir)) return

  const sourceFiles = walk(sourceDir, (p) => p.endsWith(".md"))
  for (const sourceFile of sourceFiles) {
    const relativeTail = sourceFile.slice(sourceDir.length + 1)
    const sourceRelativePath = join(sourceRelativeDir, relativeTail)
    const targetRelativePath = join(targetRelativeDir, relativeTail)
    compareMirroredFile(sourceRelativePath, targetRelativePath)
  }
}

function hasFile(candidate) {
  if (existsSync(candidate)) return true
  if (existsSync(`${candidate}.tsx`)) return true
  if (existsSync(`${candidate}.ts`)) return true
  if (existsSync(`${candidate}.md`)) return true
  if (existsSync(`${candidate}.mjs`)) return true
  if (existsSync(`${candidate}.js`)) return true
  if (existsSync(`${candidate}.json`)) return true
  if (existsSync(`${candidate}.css`)) return true
  return false
}

function shouldValidateToken(token) {
  if (!token.includes("/")) return false
  if (token.includes("...")) return false
  if (token.includes("<") || token.includes(">")) return false
  if (token.includes("BlockName") || token.includes("Example")) return false
  if (token.includes("{")) return false
  if (token.includes("*")) return false
  if (token.includes("[")) return false
  if (token.includes("|")) return false
  if (/^https?:\/\//.test(token)) return false
  if (/^[a-z]+:\/\//i.test(token)) return false
  if (token.startsWith("@radix-ui/") || token.startsWith("@tailwindcss/")) return false
  if (token.startsWith("motion/") || token.startsWith("next/") || token.startsWith("npm ")) return false
  if (token.includes(" ")) return false

  const pathPrefixes = [
    "ui/",
    "layout/",
    "references/",
    "@/components/",
    "@/lib/",
    "src/",
    "docs/",
    ".agents/",
    "tests/",
    "bin/",
    "scripts/",
    "public/",
    "components/",
    "lib/",
    "app/",
  ]
  if (pathPrefixes.some((prefix) => token.startsWith(prefix))) return true

  // Fallback: tokens with explicit file extensions are path-like.
  if (/\.(md|tsx?|mjs|js|json|css|ya?ml)$/.test(token)) return true

  return false
}

function resolveTokenCandidates(file, token) {
  const fileDir = dirname(file)

  if (token.startsWith("ui/")) {
    return [join(root, "src", "components", "ui", token.slice(3))]
  }
  if (token.startsWith("layout/")) {
    return [join(root, "src", "components", "layout", token.slice(7))]
  }
  if (token.startsWith("@/components/ui/")) {
    return [join(root, "src", "components", "ui", token.slice("@/components/ui/".length))]
  }
  if (token.startsWith("@/components/blocks/")) {
    return [join(root, "src", "components", "blocks", token.slice("@/components/blocks/".length))]
  }
  if (token.startsWith("@/components/layout/")) {
    return [join(root, "src", "components", "layout", token.slice("@/components/layout/".length))]
  }
  if (token.startsWith("@/lib/")) {
    return [join(root, "src", "lib", token.slice("@/lib/".length))]
  }
  if (token.startsWith("@/*")) {
    return [join(root, "src")]
  }
  if (token.startsWith("components/")) {
    return [join(root, "src", token)]
  }
  if (token.startsWith("lib/")) {
    return [join(root, "src", token)]
  }
  if (token.startsWith("app/")) {
    return [join(root, token), join(root, "src", token)]
  }
  if (token.startsWith("references/")) {
    return [join(fileDir, token)]
  }
  if (
    token.startsWith("src/") ||
    token.startsWith("docs/") ||
    token.startsWith(".agents/") ||
    token.startsWith("tests/") ||
    token.startsWith("bin/") ||
    token.startsWith("scripts/")
  ) {
    return [join(root, token), join(fileDir, token)]
  }

  return [join(fileDir, token), join(root, token)]
}

function checkBacktickPaths(file, content) {
  const regex = /`([^`\n]+)`/g
  for (const match of content.matchAll(regex)) {
    const token = match[1]
    if (!shouldValidateToken(token)) continue

    const candidates = resolveTokenCandidates(file, token)
    const ok = candidates.some((candidate) => hasFile(candidate))
    if (!ok) addIssue(file, `unresolved path reference: \`${token}\``)
  }
}

const packageJson = JSON.parse(readFileSync(join(root, "package.json"), "utf8"))
const devScript = packageJson.scripts?.dev ?? ""
const portMatch = devScript.match(/--port\s+(\d+)/)
const expectedPort = portMatch?.[1]

if (expectedPort) {
  const readme = readFileSync(join(root, "README.md"), "utf8")
  const actualPortMatch = readme.match(/localhost:(\d+)/)
  const actualPort = actualPortMatch?.[1]
  if (actualPort && actualPort !== expectedPort) {
    addIssue("README.md", `dev URL port mismatch (README ${actualPort}, script ${expectedPort})`)
  }
}

const staleMarkers = ["localhost:5173", "src/App.tsx", "Harversting"]

if (existsSync(scaffoldRoot)) {
  compareMirroredFile(
    "docs/nadicode/NADICODE_CONTRACT.md",
    "apps/scaffold/docs/nadicode/NADICODE_CONTRACT.md"
  )
  compareMirroredFile("scripts/ds-check.mjs", "apps/scaffold/scripts/ds-check.mjs")
  compareMirroredFile(
    "scripts/ds-generate-task-pack.mjs",
    "apps/scaffold/scripts/ds-generate-task-pack.mjs"
  )
  compareMirroredFile(
    ".agents/skills/seed-design-system/SKILL.md",
    "apps/scaffold/.agents/skills/seed-design-system/SKILL.md"
  )
  compareMirroredMarkdownTree(
    ".agents/skills/seed-design-system/references",
    "apps/scaffold/.agents/skills/seed-design-system/references"
  )

  const scaffoldAgentGuidePath = join(scaffoldRoot, "AGENTS.md")
  if (!existsSync(scaffoldAgentGuidePath)) {
    addIssue(scaffoldAgentGuidePath, "missing scaffold AGENTS.md")
  } else {
    const scaffoldAgentGuide = readFileSync(scaffoldAgentGuidePath, "utf8")
    const requiredScaffoldSections = [
      "## Install And Bootstrap",
      "## Mandatory Read Order Before Any UI Change",
      "docs/nadicode/NADICODE_CONTRACT.md",
      ".agents/skills/seed-design-system/SKILL.md",
      "npm run ds:check",
    ]
    for (const section of requiredScaffoldSections) {
      if (!scaffoldAgentGuide.includes(section)) {
        addIssue(scaffoldAgentGuidePath, `missing required scaffold guidance: \`${section}\``)
      }
    }

    const toolAgentEntryPoints = [
      "apps/scaffold/.codex/AGENTS.md",
      "apps/scaffold/.claude/CLAUDE.md",
      "apps/scaffold/.opencode/AGENTS.md",
    ]
    for (const entryPoint of toolAgentEntryPoints) {
      const entryPointPath = join(root, entryPoint)
      if (!existsSync(entryPointPath)) {
        addIssue(entryPointPath, "missing tool agent entrypoint")
        continue
      }
      const entryPointContent = readFileSync(entryPointPath, "utf8")
      if (entryPointContent !== scaffoldAgentGuide) {
        addIssue(entryPointPath, "tool agent entrypoint must match apps/scaffold/AGENTS.md")
      }
    }
  }
}

for (const file of docFiles) {
  const content = readFileSync(file, "utf8")

  for (const marker of staleMarkers) {
    if (content.includes(marker)) addIssue(file, `stale marker found: \`${marker}\``)
  }

  checkBacktickPaths(file, content)
}

const antiDriftPatterns = [
  /UI Primitives\s*\(\d+\)/,
  /Blocks\s*\(\d+\)/,
  /Pages\s*\(\d+\)/,
  /\b\d+\+\s*animated icons\b/i,
  /\b\d+\s*UI primitives\b/i,
]

for (const file of [join(root, "README.md"), join(root, "AGENTS.md")]) {
  const content = readFileSync(file, "utf8")
  for (const pattern of antiDriftPatterns) {
    if (pattern.test(content)) addIssue(file, `drift-prone hardcoded inventory phrase: ${pattern}`)
  }
}

if (issues.length > 0) {
  console.error(`docs:check failed with ${issues.length} issue(s):`)
  for (const issue of issues) {
    console.error(`- ${issue.file}: ${issue.message}`)
  }
  process.exit(1)
}

console.log(`docs:check passed (${docFiles.length} markdown files validated)`)
