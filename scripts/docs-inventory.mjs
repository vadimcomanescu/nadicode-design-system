#!/usr/bin/env node

import { readdirSync } from "node:fs"
import { join } from "node:path"

const root = process.cwd()

function walkCount(dir, predicate) {
  let total = 0
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const next = join(dir, entry.name)
    if (entry.isDirectory()) {
      total += walkCount(next, predicate)
      continue
    }
    if (predicate(entry.name, next)) total += 1
  }
  return total
}

function countTopLevelTsx(dir) {
  return readdirSync(dir)
    .filter((name) => name.endsWith(".tsx"))
    .filter((name) => !name.endsWith(".test.tsx"))
    .filter((name) => !name.startsWith("index."))
    .length
}

function countRecursiveTsx(dir) {
  return walkCount(
    dir,
    (name) => name.endsWith(".tsx") && !name.endsWith(".test.tsx") && !name.startsWith("index."),
  )
}

const uiDir = join(root, "src", "components", "ui")
const blocksDir = join(root, "src", "components", "blocks")
const pagesDir = join(root, "src", "components", "pages")
const iconsDir = join(root, "src", "components", "ui", "icons")
const chartsDir = join(root, "src", "components", "ui", "charts")

const stats = {
  uiTopLevelTsx: countTopLevelTsx(uiDir),
  blocksRecursiveTsx: countRecursiveTsx(blocksDir),
  pagesRecursiveTsx: countRecursiveTsx(pagesDir),
  iconsTopLevelTsx: countTopLevelTsx(iconsDir),
  chartsTopLevelTsx: countTopLevelTsx(chartsDir),
}

const lines = [
  "Seed Design System Inventory",
  "",
  `- ui top-level components: ${stats.uiTopLevelTsx}`,
  `- blocks (recursive): ${stats.blocksRecursiveTsx}`,
  `- pages (recursive): ${stats.pagesRecursiveTsx}`,
  `- animated icons: ${stats.iconsTopLevelTsx}`,
  `- chart primitives: ${stats.chartsTopLevelTsx}`,
]

console.log(lines.join("\n"))
