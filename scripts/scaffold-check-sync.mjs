#!/usr/bin/env node

import { execSync } from "node:child_process"

const STASH_MARKER = "scaffold-check-sync-snapshot"
let stashed = false

function run(command, options = {}) {
  execSync(command, { stdio: "inherit", ...options })
}

function runQuiet(command) {
  try {
    execSync(command, { stdio: "ignore" })
    return true
  } catch {
    return false
  }
}

function hasUntrackedFiles() {
  const output = execSync("git ls-files --others --exclude-standard", {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  })
  return output.trim().length > 0
}

function ensureSnapshot() {
  const trackedClean = runQuiet("git diff --quiet")
  const stagedClean = runQuiet("git diff --cached --quiet")
  const untrackedClean = !hasUntrackedFiles()

  if (trackedClean && stagedClean && untrackedClean) return

  console.log("scaffold:check-sync: stashing local changes for snapshot validation")
  run(`git stash push --quiet --include-untracked --message "${STASH_MARKER}"`)
  stashed = true
}

function restoreSnapshot() {
  if (!stashed) return
  try {
    run("git stash pop --quiet")
  } catch {
    console.error("scaffold:check-sync: failed to restore stashed local changes")
    console.error("run: git stash list")
    process.exit(1)
  }
}

try {
  ensureSnapshot()
  run("npm run scaffold:sync")
  run("git diff --exit-code -- apps/scaffold ':(exclude)apps/scaffold/.seed-version'")
  console.log("scaffold:check-sync passed")
} finally {
  restoreSnapshot()
}
