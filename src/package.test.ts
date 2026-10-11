import { spawn } from 'node:child_process'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import type { ESLint } from 'eslint'
import { afterAll, beforeAll, expect, test } from 'vitest'
import packageJson from '../package.json' with { type: 'json' }

let cwd: string

// Installing the packed package takes a few seconds, so the tests share one
// project
beforeAll(async () => {
  cwd = await mkdtemp(join(tmpdir(), `eslint-config-`))
  const { stdout: packOutput } = await run(
    `pnpm`,
    [`pack`, `--pack-destination`, cwd, `--json`],
    join(import.meta.dirname, `..`),
  )
  const { filename } = JSON.parse(packOutput) as { filename: string }
  await writeFiles({
    'package.json': JSON.stringify({
      type: `module`,
      devDependencies: {
        '@tomer/eslint-config': `file:${filename}`,
        eslint: packageJson.devDependencies.eslint,
        typescript: packageJson.devDependencies.typescript,
      },
    }),
    'pnpm-workspace.yaml': `allowBuilds:\n  unrs-resolver: true\n`,
    'tsconfig.json': JSON.stringify({ compilerOptions: { jsx: `react-jsx` } }),
  })
  await run(`pnpm`, [`install`, `--prefer-offline`], cwd)
}, 60_000)

afterAll(() => rm(cwd, { recursive: true, force: true }))

test(`the packed package lints a project that installs it`, async () => {
  await writeFiles({
    'eslint.config.js': `export { default } from '@tomer/eslint-config'\n`,
    'index.js': `var x = 1\nexport default x\n`,
    'index.tsx': `export const App = () => <div></div>\n`,
  })

  const { status, stdout } = await run(
    `pnpm`,
    [`exec`, `eslint`, `--format`, `json`, `index.js`, `index.tsx`],
    cwd,
  )

  // ESLint exits with 1 for lint errors and 2 for a crash
  expect(status).toBe(1)
  const ruleIds = (JSON.parse(stdout) as ESLint.LintResult[]).flatMap(
    ({ messages }) => messages.map(({ ruleId }) => ruleId),
  )
  expect(ruleIds).toStrictEqual(
    expect.arrayContaining([`no-var`, `react/self-closing-comp`]),
  )
})

test(`the packed package typechecks in a TypeScript config`, async () => {
  await writeFiles({
    'eslint.config.ts': `import config from '@tomer/eslint-config'
import { defineConfig } from 'eslint/config'

export default defineConfig([...config, { ignores: [\`dist\`] }])
`,
  })

  const { status, stdout } = await run(
    `pnpm`,
    [
      `exec`,
      `tsc`,
      `--ignoreConfig`,
      `--noEmit`,
      `--strict`,
      `--skipLibCheck`,
      `--module`,
      `nodenext`,
      `eslint.config.ts`,
    ],
    cwd,
  )

  expect({ status, stdout }).toStrictEqual({ status: 0, stdout: `` })
})

const run = (command: string, args: string[], cwd: string) =>
  new Promise<{ status: number | null; stdout: string }>((resolve, reject) => {
    const child = spawn(command, args, { cwd })
    const stdout: Buffer[] = []
    child.stdout.on(`data`, (chunk: Buffer) => stdout.push(chunk))
    child.on(`error`, reject)
    child.on(`close`, status =>
      resolve({ status, stdout: Buffer.concat(stdout).toString(`utf8`) }),
    )
  })

const writeFiles = (files: Record<string, string>) =>
  Promise.all(
    Object.entries(files).map(([path, content]) =>
      writeFile(join(cwd, path), content),
    ),
  )
