import { describe, it, expect, beforeAll, afterAll } from "vitest"
import { execSync } from "node:child_process"
import {
  existsSync, readFileSync, mkdirSync, writeFileSync,
  rmSync, lstatSync, readdirSync,
} from "node:fs"
import { join, resolve } from "node:path"

const DS_ROOT = resolve(__dirname, "..")
const INIT_SCRIPT = join(DS_ROOT, "bin", "init.mjs")
const TMP = join(DS_ROOT, "node_modules", ".cache", "init-test")

function createNextProject(name: string) {
  const dir = join(TMP, name)
  rmSync(dir, { recursive: true, force: true })
  mkdirSync(join(dir, "src", "app"), { recursive: true })
  writeFileSync(
    join(dir, "package.json"),
    JSON.stringify({
      name,
      dependencies: { next: "^15.0.0", react: "^19.0.0", "react-dom": "^19.0.0" },
    })
  )
  writeFileSync(
    join(dir, "tsconfig.json"),
    JSON.stringify({
      compilerOptions: {
        target: "ES2017",
        module: "ESNext",
        moduleResolution: "bundler",
        jsx: "preserve",
        strict: true,
      },
    })
  )
  writeFileSync(join(dir, "src", "app", "globals.css"), '@import "tailwindcss";\n')
  return dir
}

function run(cwd: string, flags = "") {
  return execSync(`node ${INIT_SCRIPT} --skip-deps --force ${flags}`, {
    cwd,
    encoding: "utf8",
    timeout: 30_000,
  })
}

describe("bin/init.mjs", () => {
  let projectDir: string

  beforeAll(() => {
    mkdirSync(TMP, { recursive: true })
    projectDir = createNextProject("test-init")
  })

  afterAll(() => {
    rmSync(TMP, { recursive: true, force: true })
  })

  describe("fresh install (src/app layout)", () => {
    let output: string

    beforeAll(() => {
      output = run(projectDir)
    })

    it("exits successfully and prints Done", () => {
      expect(output).toContain("Done!")
    })

    it("copies UI components", () => {
      expect(existsSync(join(projectDir, "src/components/ui/Button.tsx"))).toBe(true)
      expect(existsSync(join(projectDir, "src/components/ui/Dialog.tsx"))).toBe(true)
      expect(existsSync(join(projectDir, "src/components/ui/Card.tsx"))).toBe(true)
    })

    it("copies blocks", () => {
      expect(existsSync(join(projectDir, "src/components/blocks/HeroBlock.tsx"))).toBe(true)
      expect(existsSync(join(projectDir, "src/components/blocks/LoginBlock.tsx"))).toBe(true)
    })

    it("copies icons", () => {
      const iconsDir = join(projectDir, "src/components/ui/icons")
      expect(existsSync(iconsDir)).toBe(true)
      const icons = readdirSync(iconsDir)
      expect(icons.length).toBeGreaterThan(50)
    })

    it("copies hooks", () => {
      expect(existsSync(join(projectDir, "src/hooks/use-toast.ts"))).toBe(true)
      expect(existsSync(join(projectDir, "src/hooks/use-mobile.ts"))).toBe(true)
    })

    it("copies lib files", () => {
      expect(existsSync(join(projectDir, "src/lib/utils.ts"))).toBe(true)
      expect(existsSync(join(projectDir, "src/lib/ThemeProvider.tsx"))).toBe(true)
      expect(existsSync(join(projectDir, "src/lib/tokens.config.js"))).toBe(true)
      expect(existsSync(join(projectDir, "src/lib/motion.ts"))).toBe(true)
    })

    it("copies tokens.ts", () => {
      expect(existsSync(join(projectDir, "src/tokens.ts"))).toBe(true)
    })

    it("excludes test files", () => {
      expect(existsSync(join(projectDir, "src/components/ui/Button.test.tsx"))).toBe(false)
      expect(existsSync(join(projectDir, "src/components/blocks/HeroBlock.test.tsx"))).toBe(false)
      expect(existsSync(join(projectDir, "src/lib/utils.test.ts"))).toBe(false)
    })

    it("does not copy pages directory", () => {
      expect(existsSync(join(projectDir, "src/components/pages"))).toBe(false)
    })

    it("prepends 'use client' to .tsx files", () => {
      const button = readFileSync(join(projectDir, "src/components/ui/Button.tsx"), "utf8")
      expect(button.startsWith('"use client"')).toBe(true)
    })

    it("prepends 'use client' to .ts hook files", () => {
      const hook = readFileSync(join(projectDir, "src/hooks/use-toast.ts"), "utf8")
      expect(hook.startsWith('"use client"')).toBe(true)
    })

    it("does not prepend 'use client' to .js files", () => {
      const config = readFileSync(join(projectDir, "src/lib/tokens.config.js"), "utf8")
      expect(config.startsWith('"use client"')).toBe(false)
    })

    it("copies pixel fonts", () => {
      const fontsDir = join(projectDir, "public/fonts/geist-pixel")
      expect(existsSync(fontsDir)).toBe(true)
      const fonts = readdirSync(fontsDir)
      expect(fonts.length).toBe(5)
      expect(fonts.some((f) => f.endsWith(".woff2"))).toBe(true)
    })

    it("copies skill to .agents/skills/", () => {
      const skillDir = join(projectDir, ".agents/skills/seed-design-system")
      expect(existsSync(skillDir)).toBe(true)
      expect(existsSync(join(skillDir, "SKILL.md"))).toBe(true)
      expect(existsSync(join(skillDir, "references"))).toBe(true)
    })

    it("creates symlinks from .claude, .codex, .opencode to .agents", () => {
      for (const tool of [".claude", ".codex", ".opencode"]) {
        const link = join(projectDir, tool, "skills", "seed-design-system")
        expect(existsSync(link)).toBe(true)
        const stat = lstatSync(link)
        expect(stat.isSymbolicLink()).toBe(true)
      }
    })

    it("symlinks resolve to the actual skill files", () => {
      const skillMd = readFileSync(
        join(projectDir, ".claude/skills/seed-design-system/SKILL.md"),
        "utf8"
      )
      expect(skillMd).toContain("Seed Design System")
    })

    it("creates seed-tokens.css without Tailwind directives", () => {
      const css = readFileSync(join(projectDir, "src/seed-tokens.css"), "utf8")
      expect(css).toContain("--color-background")
      expect(css).toContain("glass-panel")
      expect(css).toContain(".dark")
      expect(css).toContain(".bloom")
      expect(css).not.toContain('@import "tailwindcss"')
      expect(css).not.toContain("@config")
    })

    it("patches globals.css with correct directive order", () => {
      const globals = readFileSync(join(projectDir, "src/app/globals.css"), "utf8")
      const lines = globals.split("\n")
      // @import "tailwindcss" must be first
      expect(lines[0]).toBe('@import "tailwindcss";')
      expect(globals).toContain("@custom-variant dark")
      expect(globals).toContain('@config "../../tailwind.config.js"')
      expect(globals).toContain('@import "../seed-tokens.css"')
    })

    it("creates tailwind.config.js with Next.js content paths", () => {
      const config = readFileSync(join(projectDir, "tailwind.config.js"), "utf8")
      expect(config).toContain("./src/**/*.{js,ts,jsx,tsx}")
      expect(config).toContain("./app/**/*.{js,ts,jsx,tsx}")
      expect(config).not.toContain("./index.html")
      // Token import still works
      expect(config).toContain("./src/lib/tokens.config.js")
    })

    it("creates postcss.config.mjs", () => {
      const postcss = readFileSync(join(projectDir, "postcss.config.mjs"), "utf8")
      expect(postcss).toContain("@tailwindcss/postcss")
    })

    it("patches tsconfig.json with @/* alias", () => {
      const tsconfig = JSON.parse(readFileSync(join(projectDir, "tsconfig.json"), "utf8"))
      expect(tsconfig.compilerOptions.paths["@/*"]).toEqual(["./src/*"])
    })

    it("creates CLAUDE.md and AGENTS.md in tool directories", () => {
      for (const [dir, file] of [
        [".claude", "CLAUDE.md"],
        [".codex", "AGENTS.md"],
        [".opencode", "AGENTS.md"],
      ] as const) {
        const content = readFileSync(join(projectDir, dir, file), "utf8")
        expect(content).toContain("Seed Design System")
        expect(content).toContain(".agents/skills/seed-design-system/SKILL.md")
      }
    })
  })

  describe("idempotent re-run (--update)", () => {
    let projectDir2: string

    beforeAll(() => {
      projectDir2 = createNextProject("test-idempotent")
      run(projectDir2)
      // Run again with --update
      run(projectDir2, "--update")
    })

    it("does not duplicate globals.css directives", () => {
      const globals = readFileSync(join(projectDir2, "src/app/globals.css"), "utf8")
      const twImports = (globals.match(/@import "tailwindcss"/g) || []).length
      expect(twImports).toBe(1)
      const seedImports = (globals.match(/seed-tokens/g) || []).length
      expect(seedImports).toBe(1)
    })

    it("does not double-prepend 'use client'", () => {
      const button = readFileSync(join(projectDir2, "src/components/ui/Button.tsx"), "utf8")
      const matches = (button.match(/"use client"/g) || []).length
      expect(matches).toBe(1)
    })
  })

  describe("app/ layout (no src/)", () => {
    let projectDir3: string

    beforeAll(() => {
      projectDir3 = join(TMP, "test-nosrc")
      rmSync(projectDir3, { recursive: true, force: true })
      mkdirSync(join(projectDir3, "app"), { recursive: true })
      writeFileSync(
        join(projectDir3, "package.json"),
        JSON.stringify({
          name: "test-nosrc",
          dependencies: { next: "^15.0.0", react: "^19.0.0", "react-dom": "^19.0.0" },
        })
      )
      writeFileSync(
        join(projectDir3, "tsconfig.json"),
        JSON.stringify({ compilerOptions: { strict: true } })
      )
      writeFileSync(join(projectDir3, "app", "globals.css"), "")
      run(projectDir3)
    })

    it("detects app/ layout and uses correct paths", () => {
      const globals = readFileSync(join(projectDir3, "app/globals.css"), "utf8")
      expect(globals).toContain('@config "../tailwind.config.js"')
      expect(globals).toContain('@import "../src/seed-tokens.css"')
    })

    it("still copies components to src/", () => {
      expect(existsSync(join(projectDir3, "src/components/ui/Button.tsx"))).toBe(true)
    })
  })

  describe("validation", () => {
    it("rejects non-Next.js projects", () => {
      const dir = join(TMP, "test-not-next")
      rmSync(dir, { recursive: true, force: true })
      mkdirSync(dir, { recursive: true })
      writeFileSync(join(dir, "package.json"), JSON.stringify({ name: "test" }))

      expect(() => run(dir)).toThrow()
    })

    it("rejects directories without package.json", () => {
      const dir = join(TMP, "test-empty")
      rmSync(dir, { recursive: true, force: true })
      mkdirSync(dir, { recursive: true })

      expect(() => run(dir)).toThrow()
    })
  })
})
