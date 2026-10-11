import { expect, test } from 'vitest'
import { lintFile } from './lint-file.ts'

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
    name: `an inferrable type in a Markdown TypeScript code block`,
    path: `readme.md`,
    code: `# Title\n\n\`\`\`ts\nconst x: number = 1\n\`\`\`\n`,
    ruleId: `@typescript-eslint/no-inferrable-types`,
  },
  {
    name: `an unclosed empty element in JSX`,
    path: `index.jsx`,
    code: `export const App = () => <div></div>\n`,
    ruleId: `react/self-closing-comp`,
  },
  {
    name: `an unclosed empty element in TSX`,
    path: `index.tsx`,
    code: `export const App = () => <div></div>\n`,
    ruleId: `react/self-closing-comp`,
  },
  {
    name: `it in a test directory`,
    path: `test/index.js`,
    code: `import { expect, it } from 'vitest'\n\nit('works', () => {\n  expect(1).toBe(1)\n})\n`,
    ruleId: `vitest/consistent-test-it`,
  },
  {
    name: `it in a colocated test file`,
    path: `src/index.test.ts`,
    code: `import { expect, it } from 'vitest'\n\nit('works', () => {\n  expect(1).toBe(1)\n})\n`,
    ruleId: `vitest/consistent-test-it`,
  },
  {
    name: `it in a colocated spec file`,
    path: `src/index.spec.js`,
    code: `import { expect, it } from 'vitest'\n\nit('works', () => {\n  expect(1).toBe(1)\n})\n`,
    ruleId: `vitest/consistent-test-it`,
  },
])(`reports $name`, async ({ path, code, ruleId }) => {
  const ruleIds = await lintFile(path, code)

  expect(ruleIds).toContain(ruleId)
})
