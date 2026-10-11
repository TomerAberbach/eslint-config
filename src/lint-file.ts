import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { ESLint } from 'eslint'
import { onTestFinished } from 'vitest'
import config from './index.ts'

export const lintFile = async (
  path: string,
  code: string,
  otherFiles: Record<string, string> = {},
): Promise<(string | null)[]> => {
  const cwd = await mkdtemp(join(tmpdir(), `eslint-config-`))
  onTestFinished(() => rm(cwd, { recursive: true, force: true }))
  await writeFile(join(cwd, `package.json`), JSON.stringify({ type: `module` }))
  const tsConfig = { compilerOptions: { strict: true, jsx: `react-jsx` } }
  await writeFile(join(cwd, `tsconfig.json`), JSON.stringify(tsConfig))
  for (const [filePath, content] of Object.entries({
    ...otherFiles,
    [path]: code,
  })) {
    await mkdir(dirname(join(cwd, filePath)), { recursive: true })
    await writeFile(join(cwd, filePath), content)
  }

  const eslint = new ESLint({
    cwd,
    overrideConfigFile: true,
    overrideConfig: config,
  })
  const results = await eslint.lintFiles([path])
  return results.flatMap(({ messages }) => messages.map(({ ruleId }) => ruleId))
}
