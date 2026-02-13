#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync } from "node:fs"
import { join, relative } from "node:path"

const root = process.cwd()
const scanRoots = ["src", "app", "components"]
  .map((dir) => join(root, dir))
  .filter((dir) => existsSync(dir))

const skipDirs = new Set([
  "node_modules",
  ".next",
  ".git",
  "dist",
  "coverage",
  "build",
  "out",
])

const codeFilePattern = /\.(ts|tsx|js|jsx|mjs|cjs|mts|cts|mdx)$/

const forbiddenLiteralRules = [
  {
    literal: "text-foreground",
    message: "Use text-text-primary or text-text-secondary.",
  },
  {
    literal: "text-muted-foreground",
    message: "Use text-text-secondary or text-text-tertiary.",
  },
  {
    literal: "border-error",
    message: "Use border-destructive.",
  },
  {
    literal: "bg-black/80",
    message: "Use bg-overlay/80.",
  },
]

const rawTailwindColorPattern =
  /\b(?:bg|text|border|ring|stroke|fill)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950)\b/g

const directLucideImportPattern = /from\s+["']lucide-react["']/

function walk(dir, files = []) {
  if (!existsSync(dir)) return files

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (skipDirs.has(entry.name)) continue
    const fullPath = join(dir, entry.name)

    if (entry.isDirectory()) {
      walk(fullPath, files)
      continue
    }

    if (codeFilePattern.test(entry.name)) {
      files.push(fullPath)
    }
  }

  return files
}

function normalizePath(filePath) {
  return filePath.replaceAll("\\", "/")
}

function isIconsDirectory(filePath) {
  const normalized = normalizePath(filePath)
  return (
    normalized.includes("/src/components/ui/icons/") ||
    normalized.includes("/components/ui/icons/")
  )
}

function collectLineMatches(content, predicate) {
  const lines = content.split("\n")
  const matches = []

  for (let index = 0; index < lines.length; index += 1) {
    if (predicate(lines[index])) {
      matches.push(index + 1)
    }
  }

  return matches
}

function summarizeLine(line) {
  return line.trim().slice(0, 140)
}

const files = scanRoots.flatMap((scanRoot) => walk(scanRoot))
const issues = []

for (const file of files) {
  const content = readFileSync(file, "utf8")
  const relativeFile = normalizePath(relative(root, file))
  const lines = content.split("\n")

  if (directLucideImportPattern.test(content) && !isIconsDirectory(file)) {
    const hitLines = collectLineMatches(content, (line) =>
      directLucideImportPattern.test(line)
    )
    for (const lineNumber of hitLines) {
      issues.push({
        file: relativeFile,
        line: lineNumber,
        rule: "no-direct-lucide-import",
        detail: summarizeLine(lines[lineNumber - 1]),
      })
    }
  }

  for (const rule of forbiddenLiteralRules) {
    const hitLines = collectLineMatches(content, (line) => line.includes(rule.literal))
    for (const lineNumber of hitLines) {
      issues.push({
        file: relativeFile,
        line: lineNumber,
        rule: "forbidden-token",
        detail: `${rule.literal} (${rule.message})`,
      })
    }
  }

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    const matches = line.match(rawTailwindColorPattern)
    if (!matches) continue

    for (const match of matches) {
      issues.push({
        file: relativeFile,
        line: index + 1,
        rule: "raw-tailwind-palette",
        detail: `${match} (use semantic token classes)`,
      })
    }
  }
}

if (issues.length > 0) {
  console.error(`ds:check failed with ${issues.length} issue(s):`)
  for (const issue of issues) {
    console.error(`- ${issue.file}:${issue.line} [${issue.rule}] ${issue.detail}`)
  }
  process.exit(1)
}

console.log(`ds:check passed (${files.length} files scanned)`)
