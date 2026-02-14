#!/usr/bin/env node

/**
 * Portable Nadicode updater for destination projects.
 *
 * Uses npx + GitHub source so updates do not depend on a machine-local clone path.
 */

import { spawnSync } from 'node:child_process'
import { mkdirSync } from 'node:fs'
import os from 'node:os'
import { join } from 'node:path'

const npmCache = process.env.NPM_CONFIG_CACHE || join(os.homedir(), '.cache', 'npm')
mkdirSync(npmCache, { recursive: true })

const npxBin = process.platform === 'win32' ? 'npx.cmd' : 'npx'
const args = [
  '--yes',
  'github:vadimcomanescu/nadicode-design-system',
  '--update',
  ...process.argv.slice(2),
]

const result = spawnSync(npxBin, args, {
  stdio: 'inherit',
  env: { ...process.env, NPM_CONFIG_CACHE: npmCache },
})

if (result.error) {
  console.error(result.error.message)
  process.exit(1)
}

process.exit(result.status ?? 1)
