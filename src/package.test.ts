import type { ExecFileException } from 'node:child_process'
import { execFile } from 'node:child_process'
import { readFile, rm } from 'node:fs/promises'
import { join } from 'node:path'
import { promisify } from 'node:util'
import type { ESLint } from 'eslint'
import { build } from 'tsdown'
import { afterAll, beforeAll, expect, test } from 'vitest'
import packageJson from '../package.json' with { type: 'json' }
import { makeTempDir, ruleIdsOf, writeFiles } from './testing.ts'

const execFileAsync = promisify(execFile)
const rootDir = join(import.meta.dirname, `..`)
let cwd: string

// Building, packing, and installing the package takes a few seconds, so the
// tests share one project
beforeAll(async () => {
  await build()
  cwd = await makeTempDir()
  const { stdout: packOutput } = await execFileAsync(
    `pnpm`,
    [`pack`, `--pack-destination`, cwd, `--json`],
    { cwd: rootDir },
  )
  const { filename } = JSON.parse(packOutput) as { filename: string }
  await writeFiles(cwd, {
    'package.json': JSON.stringify({
      type: `module`,
      devDependencies: {
        '@tomer/eslint-config': `file:${filename}`,
        eslint: packageJson.devDependencies.eslint,
        typescript: packageJson.devDependencies.typescript,
      },
    }),
    'pnpm-workspace.yaml': await readFile(
      join(rootDir, `pnpm-workspace.yaml`),
      `utf8`,
    ),
    'tsconfig.json': JSON.stringify({ compilerOptions: { jsx: `react-jsx` } }),
    'eslint.config.js': `export { default } from '@tomer/eslint-config'\n`,
  })
  await execFileAsync(`pnpm`, [`install`, `--prefer-offline`], { cwd })
}, 60_000)

afterAll(() => rm(cwd, { recursive: true, force: true }))

test(`the packed package lints a project that installs it`, async () => {
  await writeFiles(cwd, {
    'index.js': `var x = 1\nexport default x\n`,
    'index.tsx': `export const App = () => <div></div>\n`,
  })

  const { status, stdout } = await runPnpmExec([
    `eslint`,
    `--format`,
    `json`,
    `index.js`,
    `index.tsx`,
  ])

  // ESLint exits with 1 for lint errors and 2 for a crash
  expect(status).toBe(1)
  const ruleIds = ruleIdsOf(JSON.parse(stdout) as ESLint.LintResult[])
  expect(ruleIds).toStrictEqual(
    expect.arrayContaining([`no-var`, `stylistic/jsx-self-closing-comp`]),
  )
})

test(`the packed package typechecks in a TypeScript config`, async () => {
  // Named so ESLint doesn't load it in place of `eslint.config.js`
  await writeFiles(cwd, {
    'typed-eslint-config.ts': `import config from '@tomer/eslint-config'
import { defineConfig } from 'eslint/config'

export default defineConfig([...config, { ignores: [\`dist\`] }])
`,
  })

  const { status, stdout } = await runPnpmExec([
    `tsc`,
    `--ignoreConfig`,
    `--noEmit`,
    `--strict`,
    `--skipLibCheck`,
    `--module`,
    `nodenext`,
    `typed-eslint-config.ts`,
  ])

  expect({ status, stdout }).toStrictEqual({ status: 0, stdout: `` })
})

const runPnpmExec = (args: string[]) =>
  execFileAsync(`pnpm`, [`exec`, ...args], { cwd }).then(
    ({ stdout }) => ({ status: 0, stdout }),
    (error: unknown) => {
      const { code, stdout } = error as ExecFileException & { stdout: string }
      return { status: code, stdout }
    },
  )
