import { describe, it, expect } from "vitest"
import { existsSync } from "node:fs"
import { resolve } from "node:path"
import { readProjectFile } from "./design-system-utils"

const ROOT = resolve(import.meta.dirname, "../..")

function getStandalonePageRoutes(): string[] {
  const layoutSource = readProjectFile("src/app/(showcase)/layout.tsx")
  const match = layoutSource.match(/const STANDALONE_PAGES = \[([\s\S]*?)\] as const/)

  if (!match) {
    return []
  }

  const routes: string[] = []
  const routePattern = /value:\s*['"]([^'"]+)['"]/g

  let routeMatch: RegExpExecArray | null
  while ((routeMatch = routePattern.exec(match[1])) !== null) {
    routes.push(routeMatch[1])
  }

  return routes
}

describe("Opinion: Command Palette Routes", () => {
  it("standalone page routes point to existing app route files", () => {
    const routes = getStandalonePageRoutes()
    expect(routes.length).toBeGreaterThan(0)

    const missing: string[] = []
    for (const route of routes) {
      if (!route.startsWith("/")) {
        missing.push(`${route} (must start with /)`)
        continue
      }

      const routePagePath =
        route === "/"
          ? resolve(ROOT, "src/app/page.tsx")
          : resolve(ROOT, `src/app${route}/page.tsx`)

      if (!existsSync(routePagePath)) {
        missing.push(`${route} -> missing ${routePagePath.replace(ROOT + "/", "")}`)
      }
    }

    expect(
      missing,
      `Command palette routes with missing pages:\n${missing.join("\n")}`
    ).toHaveLength(0)
  })

  it("standalone page route values are unique", () => {
    const routes = getStandalonePageRoutes()
    const duplicates = routes.filter((route, index) => routes.indexOf(route) !== index)

    expect(
      duplicates,
      `Duplicate standalone routes found:\n${duplicates.join("\n")}`
    ).toHaveLength(0)
  })
})
