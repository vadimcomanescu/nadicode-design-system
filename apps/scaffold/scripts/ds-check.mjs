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

const codeFilePattern = /\.(ts|tsx|js|jsx|mjs|cjs|mts|cts|mdx|css)$/

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
const arbitraryTextSizePattern = /\btext-\[(?:\d+(?:\.\d+)?)(?:px|rem|em|%)\]/g
const fontPixelClassPattern = /\bfont-pixel(?:-[a-z0-9-]+)?\b/
const pixelThemePropPattern = /\bpixelTheme\s*=/
const customChatClassPattern = /\bchat-[a-z0-9-]+\b/g
const customChatCssDefinitionPattern = /\.[Cc]hat-[a-z0-9-]+\s*\{/
const classContextPattern = /className\s*=|class=|cn\(|cva\(/
const chartColorArbitraryClassPattern = /bg-\[rgb\(var\(--chart-\d+\)\)\]/
const inlinePercentWidthStylePattern = /style=\{\{\s*width:\s*`?\$\{[^}]+\}%`?\s*\}\}/
const chartPrimitiveImportPattern =
  /from\s+["'][^"']*\/components\/ui\/(?:charts\/[^"']+|Chart)["']/
const forbiddenLocalChatPrimitiveImportPattern =
  /^import\s+.*from\s+["']\.\/(?:MessageBubble|MessageList|ToolProgress|AgentActivityFeed|ItineraryWithReasoning|TripDraftPreview|PublishConfirm|ImageGrid|ConversationList)["']/

const adminPathMarkers = [
  "app/admin/",
  "src/app/admin/",
  "components/admin/",
  "src/components/admin/",
]

const chatFeaturePathMarkers = [
  "components/admin/chat/",
  "src/components/admin/chat/",
  "app/admin/chat/",
  "src/app/admin/chat/",
  "app/admin/(chat)/chat/",
  "src/app/admin/(chat)/chat/",
]

const adminDashboardPathMarkers = [
  "components/admin/dashboard/",
  "src/components/admin/dashboard/",
  "app/admin/dashboard/",
  "src/app/admin/dashboard/",
  "app/admin/(dashboard)/",
  "src/app/admin/(dashboard)/",
]

const requiredChatPrimitiveSets = {
  conversation: ["ConversationThread", "AgentMessageBubble"],
  tooling: ["ToolCallCard", "ThinkingIndicator"],
  traceability: ["SourceCitation", "AgentTimeline", "WorkflowGraph", "HandoffIndicator"],
}

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

function isTestFile(filePath) {
  return /(?:^|\/)__tests__\/|(?:^|\/).+\.(?:test|spec)\.[a-z]+$/i.test(
    normalizePath(filePath)
  )
}

function isAdminUiFile(filePath) {
  const normalized = normalizePath(filePath)
  return adminPathMarkers.some((marker) => normalized.includes(marker))
}

function isAdminChatFile(filePath) {
  const normalized = normalizePath(filePath)
  return chatFeaturePathMarkers.some((marker) => normalized.includes(marker))
}

function isAdminDashboardFile(filePath) {
  const normalized = normalizePath(filePath)
  return adminDashboardPathMarkers.some((marker) => normalized.includes(marker))
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
const adminChatFiles = []
const chatPrimitiveCoverage = {
  conversation: false,
  tooling: false,
  traceability: false,
}

for (const file of files) {
  const content = readFileSync(file, "utf8")
  const relativeFile = normalizePath(relative(root, file))
  const lines = content.split("\n")
  const fileIsTest = isTestFile(file)
  const fileIsAdmin = isAdminUiFile(file)
  const fileIsAdminChat = isAdminChatFile(file)
  const fileIsAdminDashboard = isAdminDashboardFile(file)
  const isCssFile = relativeFile.endsWith(".css")

  if (fileIsAdminChat && !fileIsTest) {
    adminChatFiles.push(relativeFile)
    for (const [category, primitives] of Object.entries(requiredChatPrimitiveSets)) {
      const usagePattern = new RegExp(`\\b(?:${primitives.join("|")})\\b`)
      if (usagePattern.test(content)) {
        chatPrimitiveCoverage[category] = true
      }
    }
    const hitLines = collectLineMatches(content, (line) =>
      forbiddenLocalChatPrimitiveImportPattern.test(line)
    )
    for (const lineNumber of hitLines) {
      issues.push({
        file: relativeFile,
        line: lineNumber,
        rule: "forbidden-bespoke-chat-primitive",
        detail: `${summarizeLine(lines[lineNumber - 1])} (use Nadicode agentic primitives from @/components/ui/*)`,
      })
    }
  }

  if (fileIsAdmin && !fileIsTest && pixelThemePropPattern.test(content)) {
    const hitLines = collectLineMatches(content, (line) =>
      pixelThemePropPattern.test(line)
    )
    for (const lineNumber of hitLines) {
      issues.push({
        file: relativeFile,
        line: lineNumber,
        rule: "admin-card-pixel-theme",
        detail:
          "pixelTheme prop is not allowed in admin UI (data surfaces must keep texture subtle and avoid retro glyph backgrounds).",
      })
    }
  }

  if (fileIsAdmin && !fileIsTest) {
    const hitLines = collectLineMatches(content, (line) =>
      fontPixelClassPattern.test(line)
    )
    for (const lineNumber of hitLines) {
      const matches =
        lines[lineNumber - 1].match(/\bfont-pixel(?:-[a-z0-9-]+)?\b/g) ?? []
      for (const match of matches) {
        issues.push({
          file: relativeFile,
          line: lineNumber,
          rule: "admin-font-pixel-disallowed",
          detail: `${match} (admin UI typography must use Satoshi/semantic Typography, not retro pixel fonts)`,
        })
      }
    }
  }

  if (
    relativeFile.endsWith("/components/ui/Chart.tsx") &&
    fontPixelClassPattern.test(content)
  ) {
    const hitLines = collectLineMatches(content, (line) =>
      fontPixelClassPattern.test(line)
    )
    for (const lineNumber of hitLines) {
      const matches =
        lines[lineNumber - 1].match(/\bfont-pixel(?:-[a-z0-9-]+)?\b/g) ?? []
      for (const match of matches) {
        issues.push({
          file: relativeFile,
          line: lineNumber,
          rule: "chart-font-pixel-disallowed",
          detail: `${match} (chart primitives are data surfaces, keep typography non-retro by default)`,
        })
      }
    }
  }

  if (
    fileIsAdminDashboard &&
    !fileIsTest &&
    chartColorArbitraryClassPattern.test(content) &&
    inlinePercentWidthStylePattern.test(content) &&
    !chartPrimitiveImportPattern.test(content)
  ) {
    const hitLines = collectLineMatches(content, (line) =>
      inlinePercentWidthStylePattern.test(line)
    )
    const targetLines = hitLines.length > 0 ? hitLines : [1]
    for (const lineNumber of targetLines) {
      issues.push({
        file: relativeFile,
        line: lineNumber,
        rule: "admin-manual-chart-bars",
        detail:
          "Manual proportional bars with inline width are not allowed in admin analytics views. Use Nadicode chart primitives (AreaChart/BarChart/LineChart/PieChart + ChartContainer).",
      })
    }
  }

  if (
    fileIsAdmin &&
    !fileIsTest &&
    /(?:^|\/)AdminShell\.tsx$/.test(relativeFile) &&
    /\bSidebarMenu\b/.test(content) &&
    !/\bSidebarGroupLabel\b/.test(content)
  ) {
    issues.push({
      file: relativeFile,
      line: 1,
      rule: "admin-nav-missing-group-label",
      detail:
        "Admin sidebar navigation must include SidebarGroupLabel for clear IA grouping (not a flat 1990s-style nav list).",
    })
  }

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

    if (fileIsAdmin && !fileIsTest) {
      const textSizeMatches = line.match(arbitraryTextSizePattern) ?? []
      for (const match of textSizeMatches) {
        issues.push({
          file: relativeFile,
          line: index + 1,
          rule: "admin-arbitrary-text-size",
          detail: `${match} (admin UI must use Typography variants or standard text-* scale)`,
        })
      }
    }

    if (isCssFile && customChatCssDefinitionPattern.test(line)) {
      issues.push({
        file: relativeFile,
        line: index + 1,
        rule: "forbidden-chat-css-class",
        detail: `${summarizeLine(line)} (chat-* CSS classes are not allowed, compose with design-system primitives/motion tokens)`,
      })
    }

    if (fileIsAdmin && !fileIsTest && classContextPattern.test(line)) {
      const chatClassMatches = line.match(customChatClassPattern) ?? []
      for (const match of chatClassMatches) {
        issues.push({
          file: relativeFile,
          line: index + 1,
          rule: "forbidden-chat-class-usage",
          detail: `${match} (chat-* utility classes are not allowed in admin UI)`,
        })
      }
    }

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

if (adminChatFiles.length > 0) {
  for (const [category, covered] of Object.entries(chatPrimitiveCoverage)) {
    if (covered) continue
    issues.push({
      file: adminChatFiles[0],
      line: 1,
      rule: "missing-agentic-chat-primitives",
      detail:
        category === "conversation"
          ? "Admin chat feature must use ConversationThread or AgentMessageBubble."
          : category === "tooling"
            ? "Admin chat feature must use ToolCallCard or ThinkingIndicator."
            : "Admin chat feature must use SourceCitation, AgentTimeline, WorkflowGraph, or HandoffIndicator.",
    })
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
