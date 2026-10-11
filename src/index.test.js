import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { ESLint } from 'eslint'
import { expect, onTestFinished, test } from 'vitest'
import config from './index.js'

const lintFile = async (path, code) => {
  const cwd = await mkdtemp(join(tmpdir(), `eslint-config-`))
  onTestFinished(() => rm(cwd, { recursive: true, force: true }))
  await writeFile(join(cwd, `package.json`), JSON.stringify({ type: `module` }))
  const tsConfig = { compilerOptions: { strict: true, jsx: `react-jsx` } }
  await writeFile(join(cwd, `tsconfig.json`), JSON.stringify(tsConfig))
  await mkdir(dirname(join(cwd, path)), { recursive: true })
  await writeFile(join(cwd, path), code)

  const eslint = new ESLint({
    cwd,
    overrideConfigFile: true,
    overrideConfig: config,
  })
  const [{ messages }] = await eslint.lintFiles([path])
  return messages.map(({ ruleId }) => ruleId)
}

test.each([
  {
    name: `var in JavaScript`,
    path: `index.js`,
    code: `var x = 1\nexport default x\n`,
    ruleId: `no-var`,
  },
  {
    name: `floating promise in TypeScript`,
    path: `index.ts`,
    code: `const run = async (): Promise<void> => {}\nrun()\n`,
    ruleId: `@typescript-eslint/no-floating-promises`,
  },
  {
    name: `var in a Markdown code block`,
    path: `readme.md`,
    code: `# Title\n\n\`\`\`js\nvar x = 1\n\`\`\`\n`,
    ruleId: `no-var`,
  },
  {
    name: `it in a test directory`,
    path: `test/index.js`,
    code: `import { expect, it } from 'vitest'\n\nit('works', () => {\n  expect(1).toBe(1)\n})\n`,
    ruleId: `vitest/consistent-test-it`,
  },
])(`reports $name`, async ({ path, code, ruleId }) => {
  const ruleIds = await lintFile(path, code)

  expect(ruleIds).toContain(ruleId)
})
