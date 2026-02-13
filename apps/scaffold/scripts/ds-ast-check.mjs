#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync } from "node:fs"
import { basename, extname, join, relative } from "node:path"
import ts from "typescript"

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

const codeFilePattern = /\.(ts|tsx|js|jsx|mjs|cjs|mts|cts)$/

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

const arbitraryTextSizePattern = /\btext-\[(?:\d+(?:\.\d+)?)(?:px|rem|em|%)\]/g
const fontPixelClassPattern = /\bfont-pixel(?:-[a-z0-9-]+)?\b/g
const customChatClassPattern = /\bchat-[a-z0-9-]+\b/g
const hardcodedColorPattern =
  /#[0-9a-fA-F]{3,8}\b|rgba?\(\s*\d|hsla?\(\s*\d/i
const spacingStyleValuePattern = /^-?\d+(?:\.\d+)?px$/i
const durationStyleValuePattern = /^-?\d+(?:\.\d+)?(?:ms|s)$/i
const numericStyleValuePattern = /^-?\d+(?:\.\d+)?$/

const classHelperNames = new Set(["cn", "cva", "clsx"])

const disallowedUiImportPrefixes = [
  "@mui/material",
  "@chakra-ui/react",
  "antd",
  "react-bootstrap",
  "bootstrap",
  "semantic-ui-react",
  "@mantine/core",
]

const forbiddenLocalChatPrimitiveImports = new Set([
  "MessageBubble",
  "MessageList",
  "ToolProgress",
  "AgentActivityFeed",
  "ItineraryWithReasoning",
  "TripDraftPreview",
  "PublishConfirm",
  "ImageGrid",
  "ConversationList",
])

const colorStyleProps = new Set([
  "color",
  "background",
  "backgroundColor",
  "borderColor",
  "fill",
  "stroke",
  "outlineColor",
  "caretColor",
  "accentColor",
])

const spacingStyleProps = new Set([
  "margin",
  "marginTop",
  "marginRight",
  "marginBottom",
  "marginLeft",
  "marginInline",
  "marginInlineStart",
  "marginInlineEnd",
  "marginBlock",
  "marginBlockStart",
  "marginBlockEnd",
  "padding",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
  "paddingInline",
  "paddingInlineStart",
  "paddingInlineEnd",
  "paddingBlock",
  "paddingBlockStart",
  "paddingBlockEnd",
  "gap",
  "rowGap",
  "columnGap",
  "borderRadius",
])

const shadowStyleProps = new Set([
  "boxShadow",
  "textShadow",
  "filter",
  "backdropFilter",
])

const durationStyleProps = new Set([
  "transitionDuration",
  "transitionDelay",
  "animationDuration",
  "animationDelay",
])

const zIndexStyleProps = new Set(["zIndex"])

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

const requiredChatPrimitiveSets = {
  conversation: ["ConversationThread", "AgentMessageBubble"],
  tooling: ["ToolCallCard", "ThinkingIndicator"],
  traceability: [
    "SourceCitation",
    "AgentTimeline",
    "WorkflowGraph",
    "HandoffIndicator",
  ],
}

const allowlistPath = join(root, "scripts", "ds-ast-allowlist.json")

function readAllowlist() {
  if (!existsSync(allowlistPath)) {
    return { rulesByPattern: [] }
  }

  try {
    const parsed = JSON.parse(readFileSync(allowlistPath, "utf8"))
    const rulesByPattern = Array.isArray(parsed.rulesByPattern)
      ? parsed.rulesByPattern
          .filter(
            (entry) =>
              entry &&
              typeof entry.pattern === "string" &&
              Array.isArray(entry.rules)
          )
          .map((entry) => ({
            pattern: entry.pattern,
            rules: entry.rules.filter((rule) => typeof rule === "string"),
          }))
      : []

    return { rulesByPattern }
  } catch (error) {
    console.error(
      `ds:ast-check failed: invalid allowlist JSON at ${normalizePath(
        relative(root, allowlistPath)
      )}\n${error instanceof Error ? error.message : String(error)}`
    )
    process.exit(1)
  }
}

function patternToRegex(pattern) {
  const escaped = pattern
    .replace(/[.+^${}()|[\]\\]/g, "\\$&")
    .replace(/\*\*/g, "___DOUBLE_STAR___")
    .replace(/\*/g, "[^/]*")
    .replace(/___DOUBLE_STAR___/g, ".*")
  return new RegExp(`^${escaped}$`)
}

const allowlist = readAllowlist()
const allowlistMatchers = allowlist.rulesByPattern.map((entry) => ({
  regex: patternToRegex(normalizePath(entry.pattern)),
  rules: new Set(entry.rules),
}))

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

function resolveScriptKind(filePath) {
  const ext = extname(filePath).toLowerCase()
  if (ext === ".tsx") return ts.ScriptKind.TSX
  if (ext === ".ts" || ext === ".mts" || ext === ".cts") return ts.ScriptKind.TS
  if (ext === ".jsx") return ts.ScriptKind.JSX
  if (ext === ".js" || ext === ".mjs" || ext === ".cjs") return ts.ScriptKind.JS
  return ts.ScriptKind.Unknown
}

function getNodePosition(sourceFile, node) {
  const { line, character } = sourceFile.getLineAndCharacterOfPosition(
    node.getStart(sourceFile)
  )
  return {
    line: line + 1,
    column: character + 1,
  }
}

function getIdentifierText(node) {
  if (ts.isIdentifier(node)) return node.text
  if (ts.isStringLiteralLike(node)) return node.text
  if (
    ts.isPropertyAccessExpression(node) &&
    ts.isIdentifier(node.name)
  ) {
    return node.name.text
  }
  return null
}

function getPropertyNameText(name) {
  if (ts.isIdentifier(name)) return name.text
  if (ts.isStringLiteralLike(name)) return name.text
  if (ts.isNumericLiteral(name)) return name.text
  return null
}

function unwrapExpression(expression) {
  if (!expression) return expression

  if (
    ts.isParenthesizedExpression(expression) ||
    ts.isAsExpression(expression) ||
    ts.isTypeAssertionExpression(expression) ||
    ts.isNonNullExpression(expression) ||
    ts.isSatisfiesExpression?.(expression)
  ) {
    return unwrapExpression(expression.expression)
  }

  return expression
}

function isClassHelperCall(node) {
  if (!ts.isCallExpression(node)) return false
  const name = getIdentifierText(node.expression)
  return Boolean(name && classHelperNames.has(name))
}

function extractTemplateStaticText(node) {
  if (ts.isNoSubstitutionTemplateLiteral(node)) return node.text
  if (!ts.isTemplateExpression(node)) return null

  let text = node.head.text
  for (const span of node.templateSpans) {
    text += ` ${span.literal.text}`
  }
  return text
}

function collectClassStringsFromExpression(expression, acc = []) {
  if (!expression) return acc
  const unwrapped = unwrapExpression(expression)
  if (!unwrapped) return acc

  if (ts.isStringLiteralLike(unwrapped)) {
    acc.push(unwrapped.text)
    return acc
  }

  if (ts.isNoSubstitutionTemplateLiteral(unwrapped) || ts.isTemplateExpression(unwrapped)) {
    const text = extractTemplateStaticText(unwrapped)
    if (text) acc.push(text)
    return acc
  }

  if (ts.isConditionalExpression(unwrapped)) {
    collectClassStringsFromExpression(unwrapped.whenTrue, acc)
    collectClassStringsFromExpression(unwrapped.whenFalse, acc)
    return acc
  }

  if (ts.isBinaryExpression(unwrapped) && unwrapped.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    collectClassStringsFromExpression(unwrapped.left, acc)
    collectClassStringsFromExpression(unwrapped.right, acc)
    return acc
  }

  if (ts.isArrayLiteralExpression(unwrapped)) {
    for (const element of unwrapped.elements) {
      collectClassStringsFromExpression(element, acc)
    }
    return acc
  }

  if (ts.isObjectLiteralExpression(unwrapped)) {
    for (const property of unwrapped.properties) {
      if (ts.isPropertyAssignment(property) || ts.isShorthandPropertyAssignment(property)) {
        const key = getPropertyNameText(property.name)
        if (key) acc.push(key)
      }
    }
    return acc
  }

  if (ts.isCallExpression(unwrapped)) {
    for (const arg of unwrapped.arguments) {
      collectClassStringsFromExpression(arg, acc)
    }
    return acc
  }

  return acc
}

function createIssueBucket() {
  return []
}

function isIssueAllowlisted(rule, file) {
  const normalizedFile = normalizePath(file)
  for (const entry of allowlistMatchers) {
    if (!entry.regex.test(normalizedFile)) continue
    if (entry.rules.has("*") || entry.rules.has(rule)) return true
  }
  return false
}

function pushIssue(issues, sourceFile, node, file, rule, detail) {
  if (isIssueAllowlisted(rule, file)) return

  const position = getNodePosition(sourceFile, node)
  issues.push({
    file,
    line: position.line,
    column: position.column,
    rule,
    detail,
  })
}

function evaluateStyleValueStaticText(expression) {
  const unwrapped = unwrapExpression(expression)
  if (!unwrapped) return null

  if (ts.isStringLiteralLike(unwrapped)) return unwrapped.text
  if (ts.isNoSubstitutionTemplateLiteral(unwrapped) || ts.isTemplateExpression(unwrapped)) {
    return extractTemplateStaticText(unwrapped)
  }
  return null
}

function inspectStyleObjectExpression({
  expression,
  issues,
  sourceFile,
  file,
}) {
  const unwrapped = unwrapExpression(expression)
  if (!unwrapped) return

  if (ts.isConditionalExpression(unwrapped)) {
    inspectStyleObjectExpression({
      expression: unwrapped.whenTrue,
      issues,
      sourceFile,
      file,
    })
    inspectStyleObjectExpression({
      expression: unwrapped.whenFalse,
      issues,
      sourceFile,
      file,
    })
    return
  }

  if (!ts.isObjectLiteralExpression(unwrapped)) return

  for (const property of unwrapped.properties) {
    if (!ts.isPropertyAssignment(property)) continue

    const propertyName = getPropertyNameText(property.name)
    if (!propertyName) continue

    const valueExpression = unwrapExpression(property.initializer)
    if (!valueExpression) continue

    const staticText = evaluateStyleValueStaticText(valueExpression)

    if (colorStyleProps.has(propertyName) && staticText) {
      if (
        hardcodedColorPattern.test(staticText) &&
        !staticText.includes("var(--") &&
        !staticText.includes("hsl(var(--")
      ) {
        pushIssue(
          issues,
          sourceFile,
          property.initializer,
          file,
          "hardcoded-inline-color",
          `${propertyName}: ${staticText} (use semantic tokens or CSS vars)`
        )
      }
    }

    if (shadowStyleProps.has(propertyName) && staticText) {
      if (
        hardcodedColorPattern.test(staticText) &&
        !staticText.includes("var(--") &&
        !staticText.includes("hsl(var(--")
      ) {
        pushIssue(
          issues,
          sourceFile,
          property.initializer,
          file,
          "hardcoded-inline-shadow",
          `${propertyName}: ${staticText} (use semantic tokens/CSS vars for shadow color)`
        )
      }
    }

    if (spacingStyleProps.has(propertyName)) {
      if (ts.isNumericLiteral(valueExpression)) {
        pushIssue(
          issues,
          sourceFile,
          property.initializer,
          file,
          "hardcoded-inline-spacing",
          `${propertyName}: ${valueExpression.text} (use design-system spacing tokens/classes)`
        )
        continue
      }

      if (staticText && spacingStyleValuePattern.test(staticText)) {
        pushIssue(
          issues,
          sourceFile,
          property.initializer,
          file,
          "hardcoded-inline-spacing",
          `${propertyName}: ${staticText} (use design-system spacing tokens/classes)`
        )
      }
    }

    if (durationStyleProps.has(propertyName)) {
      if (ts.isNumericLiteral(valueExpression)) {
        if (Number(valueExpression.text) > 0) {
          pushIssue(
            issues,
            sourceFile,
            property.initializer,
            file,
            "hardcoded-inline-duration",
            `${propertyName}: ${valueExpression.text} (use motion tokens/classes)`
          )
        }
        continue
      }

      if (staticText && durationStyleValuePattern.test(staticText)) {
        pushIssue(
          issues,
          sourceFile,
          property.initializer,
          file,
          "hardcoded-inline-duration",
          `${propertyName}: ${staticText} (use motion tokens/classes)`
        )
      }
    }

    if (zIndexStyleProps.has(propertyName)) {
      if (ts.isNumericLiteral(valueExpression)) {
        if (Number(valueExpression.text) > 0) {
          pushIssue(
            issues,
            sourceFile,
            property.initializer,
            file,
            "hardcoded-inline-zindex",
            `${propertyName}: ${valueExpression.text} (use z-* utility scale)`
          )
        }
        continue
      }

      if (
        staticText &&
        numericStyleValuePattern.test(staticText) &&
        Number(staticText) > 0
      ) {
        pushIssue(
          issues,
          sourceFile,
          property.initializer,
          file,
          "hardcoded-inline-zindex",
          `${propertyName}: ${staticText} (use z-* utility scale)`
        )
      }
    }
  }
}

function inspectClassTokens({
  tokens,
  issues,
  sourceFile,
  node,
  file,
  fileIsAdmin,
}) {
  for (const tokenBucket of tokens) {
    for (const rule of forbiddenLiteralRules) {
      if (tokenBucket.includes(rule.literal)) {
        pushIssue(
          issues,
          sourceFile,
          node,
          file,
          "forbidden-token",
          `${rule.literal} (${rule.message})`
        )
      }
    }

    for (const match of tokenBucket.match(rawTailwindColorPattern) ?? []) {
      pushIssue(
        issues,
        sourceFile,
        node,
        file,
        "raw-tailwind-palette",
        `${match} (use semantic token classes)`
      )
    }

    if (fileIsAdmin) {
      for (const match of tokenBucket.match(arbitraryTextSizePattern) ?? []) {
        pushIssue(
          issues,
          sourceFile,
          node,
          file,
          "admin-arbitrary-text-size",
          `${match} (use Typography variants or standard text-* scale)`
        )
      }

      for (const match of tokenBucket.match(customChatClassPattern) ?? []) {
        pushIssue(
          issues,
          sourceFile,
          node,
          file,
          "forbidden-chat-class-usage",
          `${match} (chat-* utility classes are not allowed in admin UI)`
        )
      }

      for (const match of tokenBucket.match(fontPixelClassPattern) ?? []) {
        pushIssue(
          issues,
          sourceFile,
          node,
          file,
          "admin-font-pixel-disallowed",
          `${match} (admin UI typography must use Satoshi/semantic Typography)`
        )
      }
    }
  }
}

function scanFile(filePath, globalState) {
  const content = readFileSync(filePath, "utf8")
  const relativeFile = normalizePath(relative(root, filePath))

  const fileIsTest = isTestFile(filePath)
  const fileIsAdmin = isAdminUiFile(filePath)
  const fileIsAdminChat = isAdminChatFile(filePath)

  const scriptKind = resolveScriptKind(filePath)
  const sourceFile = ts.createSourceFile(
    filePath,
    content,
    ts.ScriptTarget.Latest,
    true,
    scriptKind
  )

  const issues = createIssueBucket()

  let hasSidebarMenu = false
  let hasSidebarGroupLabel = false

  if (fileIsAdminChat && !fileIsTest) {
    globalState.adminChatFiles.push(relativeFile)
  }

  function visit(node) {
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
      const importSource = node.moduleSpecifier.text

      if (importSource === "lucide-react" && !isIconsDirectory(filePath)) {
        pushIssue(
          issues,
          sourceFile,
          node.moduleSpecifier,
          relativeFile,
          "no-direct-lucide-import",
          "Import animated icons from @/components/ui/icons/* instead of lucide-react."
        )
      }

      for (const disallowedImport of disallowedUiImportPrefixes) {
        if (
          importSource === disallowedImport ||
          importSource.startsWith(`${disallowedImport}/`)
        ) {
          pushIssue(
            issues,
            sourceFile,
            node.moduleSpecifier,
            relativeFile,
            "forbidden-external-ui-library",
            `${importSource} is not allowed (use Nadicode primitives from @/components/ui/*).`
          )
          break
        }
      }

      if (
        fileIsAdminChat &&
        !fileIsTest &&
        importSource.startsWith("./")
      ) {
        const importedBase = basename(importSource).replace(/\.[a-z]+$/i, "")
        if (forbiddenLocalChatPrimitiveImports.has(importedBase)) {
          pushIssue(
            issues,
            sourceFile,
            node.moduleSpecifier,
            relativeFile,
            "forbidden-bespoke-chat-primitive",
            `${importSource} (use Nadicode agentic primitives from @/components/ui/*)`
          )
        }
      }
    }

    if (
      ts.isJsxOpeningElement(node) ||
      ts.isJsxSelfClosingElement(node)
    ) {
      const tagName = node.tagName
      if (ts.isIdentifier(tagName)) {
        const componentName = tagName.text

        if (componentName === "SidebarMenu") hasSidebarMenu = true
        if (componentName === "SidebarGroupLabel") hasSidebarGroupLabel = true

        if (fileIsAdminChat && !fileIsTest) {
          for (const [category, primitives] of Object.entries(requiredChatPrimitiveSets)) {
            if (primitives.includes(componentName)) {
              globalState.chatPrimitiveCoverage[category] = true
            }
          }
        }
      }
    }

    if (ts.isJsxAttribute(node)) {
      const attrName = ts.isIdentifier(node.name) ? node.name.text : null
      if (!attrName) {
        ts.forEachChild(node, visit)
        return
      }

      if (fileIsAdmin && !fileIsTest && attrName === "pixelTheme") {
        pushIssue(
          issues,
          sourceFile,
          node.name,
          relativeFile,
          "admin-card-pixel-theme",
          "pixelTheme prop is not allowed in admin UI."
        )
      }

      if (
        (attrName === "className" || attrName === "class") &&
        node.initializer
      ) {
        if (ts.isStringLiteralLike(node.initializer)) {
          inspectClassTokens({
            tokens: [node.initializer.text],
            issues,
            sourceFile,
            node: node.initializer,
            file: relativeFile,
            fileIsAdmin: fileIsAdmin && !fileIsTest,
          })
        } else if (ts.isJsxExpression(node.initializer) && node.initializer.expression) {
          const expression = unwrapExpression(node.initializer.expression)
          if (!expression) {
            ts.forEachChild(node, visit)
            return
          }

          if (!isClassHelperCall(expression)) {
            const tokens = collectClassStringsFromExpression(expression)
            inspectClassTokens({
              tokens,
              issues,
              sourceFile,
              node: expression,
              file: relativeFile,
              fileIsAdmin: fileIsAdmin && !fileIsTest,
            })
          }
        }
      }

      if (attrName === "style" && ts.isJsxExpression(node.initializer)) {
        inspectStyleObjectExpression({
          expression: node.initializer.expression,
          issues,
          sourceFile,
          file: relativeFile,
        })
      }
    }

    if (ts.isCallExpression(node) && isClassHelperCall(node)) {
      const collectedTokens = []
      for (const arg of node.arguments) {
        collectClassStringsFromExpression(arg, collectedTokens)
      }
      inspectClassTokens({
        tokens: collectedTokens,
        issues,
        sourceFile,
        node,
        file: relativeFile,
        fileIsAdmin: fileIsAdmin && !fileIsTest,
      })
    }

    ts.forEachChild(node, visit)
  }

  visit(sourceFile)

  if (
    fileIsAdmin &&
    !fileIsTest &&
    /(?:^|\/)AdminShell\.tsx$/.test(relativeFile) &&
    hasSidebarMenu &&
    !hasSidebarGroupLabel
  ) {
    if (!isIssueAllowlisted("admin-nav-missing-group-label", relativeFile)) {
      issues.push({
        file: relativeFile,
        line: 1,
        column: 1,
        rule: "admin-nav-missing-group-label",
        detail:
          "Admin sidebar navigation must include SidebarGroupLabel for clear IA grouping.",
      })
    }
  }

  return issues
}

const files = scanRoots.flatMap((scanRoot) => walk(scanRoot))
const issues = []
const globalState = {
  adminChatFiles: [],
  chatPrimitiveCoverage: {
    conversation: false,
    tooling: false,
    traceability: false,
  },
}

for (const file of files) {
  issues.push(...scanFile(file, globalState))
}

if (globalState.adminChatFiles.length > 0) {
  for (const [category, covered] of Object.entries(globalState.chatPrimitiveCoverage)) {
    if (covered) continue
    const targetFile = globalState.adminChatFiles[0]
    if (!isIssueAllowlisted("missing-agentic-chat-primitives", targetFile)) {
      issues.push({
        file: targetFile,
        line: 1,
        column: 1,
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
}

if (issues.length > 0) {
  console.error(`ds:ast-check failed with ${issues.length} issue(s):`)
  for (const issue of issues) {
    console.error(
      `- ${issue.file}:${issue.line}:${issue.column} [${issue.rule}] ${issue.detail}`
    )
  }
  process.exit(1)
}

console.log(`ds:ast-check passed (${files.length} files scanned)`)
