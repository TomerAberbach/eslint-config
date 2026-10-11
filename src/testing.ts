import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { ESLint } from 'eslint'
import { onTestFinished } from 'vitest'
import config from './index.ts'

export const makeTempDir = (): Promise<string> =>
  mkdtemp(join(tmpdir(), `eslint-config-`))

export const writeFiles = async (
  dir: string,
  files: Record<string, string>,
): Promise<void> => {
  await Promise.all(
    Object.entries(files).map(async ([path, content]) => {
      await mkdir(dirname(join(dir, path)), { recursive: true })
      await writeFile(join(dir, path), content)
    }),
  )
}

export const ruleIdsOf = (results: ESLint.LintResult[]): (string | null)[] =>
  results.flatMap(({ messages }) => messages.map(({ ruleId }) => ruleId))

export const lintFile = async (
  path: string,
  code: string,
  otherFiles: Record<string, string> = {},
): Promise<(string | null)[]> => {
  const cwd = await makeTempDir()
  onTestFinished(() => rm(cwd, { recursive: true, force: true }))
  await writeFiles(cwd, {
    'package.json': JSON.stringify({ type: `module` }),
    'tsconfig.json': JSON.stringify({
      compilerOptions: { strict: true, jsx: `react-jsx` },
    }),
    ...otherFiles,
    [path]: code,
  })

  const eslint = new ESLint({
    cwd,
    overrideConfigFile: true,
    overrideConfig: config,
  })
  return ruleIdsOf(await eslint.lintFiles([path]))
}
