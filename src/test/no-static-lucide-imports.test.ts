import { describe, it, expect } from "vitest";
import * as fs from "fs";
import * as path from "path";

function getComponentFiles(dir: string): string[] {
  const results: string[] = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Skip the icons directory -- those ARE the animated wrappers
      if (entry.name === "icons") continue;
      results.push(...getComponentFiles(fullPath));
    } else if (entry.isFile() && /\.tsx$/.test(entry.name) && !entry.name.endsWith(".test.tsx")) {
      results.push(fullPath);
    }
  }

  return results;
}

describe("no static lucide-react imports", () => {
  const componentsDir = path.resolve(__dirname, "../components");
  const files = getComponentFiles(componentsDir);

  it("should find component files to scan", () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it("should not import directly from lucide-react", () => {
    const violations: string[] = [];

    for (const file of files) {
      const content = fs.readFileSync(file, "utf-8");
      if (/from\s+['"]lucide-react['"]/.test(content)) {
        violations.push(path.relative(componentsDir, file));
      }
    }

    expect(violations, `Files with direct lucide-react imports:\n${violations.join("\n")}`).toEqual([]);
  });
});
