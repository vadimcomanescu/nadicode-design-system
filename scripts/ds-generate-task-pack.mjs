#!/usr/bin/env node

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, resolve } from "node:path"

function parseArgs(argv) {
  const options = {}
  for (let i = 0; i < argv.length; i += 1) {
    const key = argv[i]
    if (!key.startsWith("--")) continue
    const normalized = key.slice(2)
    const value = argv[i + 1]
    if (!value || value.startsWith("--")) {
      options[normalized] = "true"
      continue
    }
    options[normalized] = value
    i += 1
  }
  return options
}

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"))
}

function slugify(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function resolveScopePath(root, explicitPath) {
  if (explicitPath) return resolve(root, explicitPath)

  const candidates = [
    resolve(root, "input", "scope-definition.json"),
    resolve(root, "scope-definition.json"),
  ]

  for (const candidate of candidates) {
    if (existsSync(candidate)) return candidate
  }

  return null
}

function renderRoutePattern(pattern, useCase) {
  const primaryEntity =
    useCase.primary_entity ?? useCase.primaryEntity ?? useCase.entity ?? "resource"
  const entitySlug = slugify(primaryEntity) || "resource"

  return pattern
    .replaceAll("[entity]", entitySlug)
    .replaceAll("[id]", ":id")
}

function buildTaskPack({
  scopePath,
  catalogPath,
  outputPath,
  includeUnmapped = false,
}) {
  const scope = readJson(scopePath)
  const catalog = readJson(catalogPath)

  const useCases = scope.use_cases ?? scope.useCases ?? []
  if (!Array.isArray(useCases) || useCases.length === 0) {
    throw new Error(`No use cases found in ${scopePath}`)
  }

  const catalogIntents = catalog.intents ?? {}
  const issues = []
  const rows = []
  const groupedByIntent = new Map()

  for (const useCase of useCases) {
    const id = useCase.id ?? "unknown-id"
    const name = useCase.name ?? id
    const intent = useCase.page_intent ?? useCase.pageIntent

    if (!intent) {
      issues.push(`Use case ${id} (${name}) is missing page_intent`)
      continue
    }

    const definition = catalogIntents[intent]
    if (!definition) {
      issues.push(`Use case ${id} (${name}) has unmapped page_intent '${intent}'`)
      if (!includeUnmapped) continue
    }

    const routePatterns = definition?.routePatterns ?? []
    const renderedRoutes = routePatterns.map((pattern) => renderRoutePattern(pattern, useCase))
    const recipePath = definition?.recipe ?? "UNMAPPED"

    const row = {
      id,
      name,
      intent,
      routes: renderedRoutes,
      recipePath,
      requiredComponents: definition?.requiredComponents ?? [],
      requiredStates: definition?.requiredStates ?? [],
    }

    rows.push(row)

    const bucket = groupedByIntent.get(intent) ?? []
    bucket.push(row)
    groupedByIntent.set(intent, bucket)
  }

  const lines = []
  lines.push("# Nadicode Task Pack")
  lines.push("")
  lines.push(`Generated from: \`${scopePath}\``)
  lines.push(`Catalog: \`${catalogPath}\``)
  lines.push("")
  lines.push("## Coverage Table")
  lines.push("")
  lines.push("| Use Case | Intent | Routes | Recipe |")
  lines.push("|---|---|---|---|")

  for (const row of rows) {
    lines.push(
      `| \`${row.id}\` ${row.name} | \`${row.intent}\` | ${row.routes.join("<br>")} | \`${row.recipePath}\` |`
    )
  }

  lines.push("")
  lines.push("## Implementation Batches By Intent")
  lines.push("")

  for (const [intent, intentRows] of groupedByIntent.entries()) {
    const definition = catalogIntents[intent]
    lines.push(`### ${intent}`)
    lines.push("")
    if (definition?.recipe) {
      lines.push(`- Recipe: \`${definition.recipe}\``)
    }
    if (definition?.navigationPolicy) {
      lines.push(`- Navigation policy: \`${definition.navigationPolicy}\``)
    }
    if (definition?.requiredComponents?.length) {
      lines.push(`- Required components: ${definition.requiredComponents.map((value) => `\`${value}\``).join(", ")}`)
    }
    if (definition?.requiredStates?.length) {
      lines.push(`- Required states: ${definition.requiredStates.map((value) => `\`${value}\``).join(", ")}`)
    }
    lines.push("- Use cases:")
    for (const row of intentRows) {
      lines.push(`  - \`${row.id}\` ${row.name} -> ${row.routes.join(", ")}`)
    }
    lines.push("- Checklist:")
    lines.push("  - [ ] Implement all routes listed for this intent")
    lines.push("  - [ ] Apply recipe composition and required states")
    lines.push("  - [ ] Verify components and tokens follow Nadicode contract")
    lines.push("")
  }

  lines.push("## Global Validation Gates")
  lines.push("")
  lines.push("```bash")
  lines.push("npm run ds:check")
  lines.push("npm run ds:ast-check")
  lines.push("npx tsc --noEmit")
  lines.push("npm run build")
  lines.push("```")
  lines.push("")

  if (issues.length > 0) {
    lines.push("## Blocking Issues")
    lines.push("")
    for (const issue of issues) {
      lines.push(`- ${issue}`)
    }
    lines.push("")
  }

  mkdirSync(dirname(outputPath), { recursive: true })
  writeFileSync(outputPath, `${lines.join("\n")}\n`)

  return { issues, routeCount: rows.length }
}

function main() {
  const root = process.cwd()
  const args = parseArgs(process.argv.slice(2))

  const scopePath = resolveScopePath(root, args.scope)
  if (!scopePath) {
    console.error(
      "ds:task-pack failed: scope file not found. Provide --scope or place scope-definition.json in input/."
    )
    process.exit(1)
  }

  const catalogPath = resolve(
    root,
    args.catalog ?? "docs/nadicode/factory/page-intent-catalog.json"
  )
  if (!existsSync(catalogPath)) {
    console.error(`ds:task-pack failed: catalog not found at ${catalogPath}`)
    process.exit(1)
  }

  const outputPath = resolve(
    root,
    args.out ?? "docs/nadicode/generated/task-pack.md"
  )

  const { issues, routeCount } = buildTaskPack({
    scopePath,
    catalogPath,
    outputPath,
    includeUnmapped: args["allow-partial"] === "true",
  })

  if (issues.length > 0) {
    console.error(`ds:task-pack generated with ${issues.length} blocking issue(s):`)
    for (const issue of issues) {
      console.error(`- ${issue}`)
    }
    console.error(`Task pack written to ${outputPath}`)
    process.exit(1)
  }

  console.log(`ds:task-pack generated (${routeCount} mapped use case(s)) -> ${outputPath}`)
}

main()
