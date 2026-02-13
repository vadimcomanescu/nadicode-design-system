#!/usr/bin/env bash
set -euo pipefail

# Cross-repo sync validation: proves DS changes won't break the scaffold.
# Clones scaffold into a temp dir, runs init --update, then scaffold checks.

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DS_ROOT="$(dirname "$SCRIPT_DIR")"
REPO_URL="${SCAFFOLD_REPO_URL:-https://github.com/vadimcomanescu/scaffold-nextjs-saas.git}"
REQUIRE_SYNC="${SYNC_SCAFFOLD_REQUIRED:-0}"

AUTH_REPO="$REPO_URL"
if [[ -n "${SCAFFOLD_PAT:-}" && "$REPO_URL" == https://github.com/* ]]; then
  AUTH_REPO="${REPO_URL/https:\/\//https:\/\/x-access-token:${SCAFFOLD_PAT}@}"
fi

echo "==> Sync validation: cloning scaffold..."
TMPDIR=$(mktemp -d)
trap 'rm -rf "$TMPDIR"' EXIT

if ! GIT_TERMINAL_PROMPT=0 git clone --depth 1 --quiet "$AUTH_REPO" "$TMPDIR/scaffold"; then
  echo "==> Scaffold clone unavailable (repo access or network)."
  echo "==> Skipping sync validation."
  echo "==> Set SCAFFOLD_PAT or SCAFFOLD_REPO_URL to enable clone, or SYNC_SCAFFOLD_REQUIRED=1 to fail hard."
  if [[ "$REQUIRE_SYNC" == "1" ]]; then
    exit 1
  fi
  exit 0
fi

echo "==> Installing scaffold deps..."
cd "$TMPDIR/scaffold"
npm ci --quiet 2>&1 | tail -1

echo "==> Running init --update..."
node "$DS_ROOT/bin/init.mjs" --update --skip-deps

echo "==> Typecheck..."
npx tsc --noEmit

echo "==> Lint..."
npx eslint .

echo "==> Tests..."
# Scaffold repositories may define strict global coverage budgets that are not
# meaningful for vendoring sync checks. Validate correctness with tests only.
npx vitest run

echo "==> Build..."
npm run build

echo "==> Sync validation passed."
