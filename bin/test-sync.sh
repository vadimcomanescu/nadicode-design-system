#!/usr/bin/env bash
set -euo pipefail

# Cross-repo sync validation: proves DS changes won't break the scaffold.
# Clones scaffold into a temp dir, runs init --update, then scaffold checks.

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DS_ROOT="$(dirname "$SCRIPT_DIR")"
REPO="git@github.com:vadimcomanescu/scaffold-nextjs-saas.git"

echo "==> Sync validation: cloning scaffold..."
TMPDIR=$(mktemp -d)
trap 'rm -rf "$TMPDIR"' EXIT

git clone --depth 1 --quiet "$REPO" "$TMPDIR/scaffold"

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
npx vitest run --coverage

echo "==> Build..."
npm run build

echo "==> Sync validation passed."
