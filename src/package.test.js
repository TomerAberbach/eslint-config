import { spawn } from 'node:child_process'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { expect, onTestFinished, test } from 'vitest'
import packageJson from '../package.json' with { type: 'json' }

const run = (command, args, cwd) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd })
    const stdout = []
    child.stdout.on(`data`, chunk => stdout.push(chunk))
    child.on(`error`, reject)
    child.on(`close`, status =>
      resolve({ status, stdout: Buffer.concat(stdout).toString(`utf8`) }),
    )
  })

const writeFiles = (cwd, files) =>
  Promise.all(
    Object.entries(files).map(([path, content]) =>
      writeFile(join(cwd, path), content),
    ),
  )

test(
  `the packed package lints a project that installs it`,
  { timeout: 60_000 },
  async () => {
    const cwd = await mkdtemp(join(tmpdir(), `eslint-config-`))
    onTestFinished(() => rm(cwd, { recursive: true, force: true }))
    const { stdout: packOutput } = await run(
      `pnpm`,
      [`pack`, `--pack-destination`, cwd, `--json`],
      join(import.meta.dirname, `..`),
    )
    const { filename } = JSON.parse(packOutput)
    await writeFiles(cwd, {
      'package.json': JSON.stringify({
        type: `module`,
        devDependencies: {
          '@tomer/eslint-config': `file:${filename}`,
          eslint: packageJson.devDependencies.eslint,
          typescript: packageJson.devDependencies.typescript,
        },
      }),
      'pnpm-workspace.yaml': `allowBuilds:\n  unrs-resolver: true\n`,
      'eslint.config.js': `export { default } from '@tomer/eslint-config'\n`,
      'tsconfig.json': JSON.stringify({
        compilerOptions: { jsx: `react-jsx` },
      }),
      'index.js': `var x = 1\nexport default x\n`,
      'index.tsx': `export const App = () => <div></div>\n`,
    })
    await run(`pnpm`, [`install`, `--prefer-offline`], cwd)

    const { status, stdout } = await run(
      `pnpm`,
      [`exec`, `eslint`, `--format`, `json`, `index.js`, `index.tsx`],
      cwd,
    )

    // ESLint exits with 1 for lint errors and 2 for a crash
    expect(status).toBe(1)
    const ruleIds = JSON.parse(stdout).flatMap(({ messages }) =>
      messages.map(({ ruleId }) => ruleId),
    )
    expect(ruleIds).toStrictEqual(
      expect.arrayContaining([`no-var`, `react/self-closing-comp`]),
    )
  },
)
