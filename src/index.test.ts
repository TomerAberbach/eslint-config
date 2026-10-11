import { ESLint } from 'eslint'
import { expect, test } from 'vitest'
import config from './index.ts'
import { lintFile } from './testing.ts'

const unclosedDivCode = `export const App = () => <div></div>\n`
const derivedStateCode = `import { useEffect, useState } from 'react'

export const FullName = ({ first, last }) => {
  const [fullName, setFullName] = useState(\`\`)
  useEffect(() => {
    setFullName(\`\${first} \${last}\`)
  }, [first, last])
  return fullName
}
`
const derivedStateHookCode = `import { useEffect, useState } from 'react'

export const useFullName = (first: string, last: string): string => {
  const [fullName, setFullName] = useState(\`\`)
  useEffect(() => {
    setFullName(\`\${first} \${last}\`)
  }, [first, last])
  return fullName
}
`
const onlineStatusCode = `import { useEffect, useState } from 'react'

export const OnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(true)
  useEffect(() => {
    const update = () => setIsOnline(navigator.onLine)
    update()
    window.addEventListener('online', update)
    window.addEventListener('offline', update)
    return () => {
      window.removeEventListener('online', update)
      window.removeEventListener('offline', update)
    }
  }, [])
  return <p>{String(isOnline)}</p>
}
`
const fastCheckDuplicateTitleCode = `import { test } from '@fast-check/vitest'
import { expect } from 'vitest'

test('works', () => {
  expect(1).toBe(1)
})

test('works', () => {
  expect(2).toBe(2)
})
`
const devDependencyImportCode = `import dev from 'dev-only'\n\nexport default dev\n`
const devDependencyFiles = {
  'package.json': JSON.stringify({
    type: `module`,
    devDependencies: { 'dev-only': `1.0.0` },
  }),
  'node_modules/dev-only/package.json': JSON.stringify({
    name: `dev-only`,
    main: `index.js`,
  }),
  'node_modules/dev-only/index.js': `module.exports = {}\n`,
}
const itTestCode = `import { expect, it } from 'vitest'\n\nit('works', () => {\n  expect(1).toBe(1)\n})\n`

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
    code: unclosedDivCode,
    ruleId: `react/self-closing-comp`,
  },
  {
    name: `an unclosed empty element in TSX`,
    path: `index.tsx`,
    code: unclosedDivCode,
    ruleId: `react/self-closing-comp`,
  },
  {
    name: `state derived in an effect`,
    path: `index.jsx`,
    code: derivedStateCode,
    ruleId: `react-you-might-not-need-an-effect/no-derived-state`,
  },
  {
    name: `state derived in an effect in a custom hook outside of JSX`,
    path: `use-full-name.ts`,
    code: derivedStateHookCode,
    ruleId: `react-you-might-not-need-an-effect/no-derived-state`,
  },
  {
    name: `an external store subscribed to in an effect`,
    path: `index.jsx`,
    code: onlineStatusCode,
    ruleId: `react-you-might-not-need-an-effect/no-external-store-subscription`,
  },
  {
    name: `it in a test directory`,
    path: `test/index.js`,
    code: itTestCode,
    ruleId: `vitest/consistent-test-it`,
  },
  {
    name: `it in a colocated test file`,
    path: `src/index.test.ts`,
    code: itTestCode,
    ruleId: `vitest/consistent-test-it`,
  },
  {
    name: `it in a colocated spec file`,
    path: `src/index.spec.js`,
    code: itTestCode,
    ruleId: `vitest/consistent-test-it`,
  },
  {
    name: `a duplicate title in a test from @fast-check/vitest`,
    path: `src/index.test.js`,
    code: fastCheckDuplicateTitleCode,
    ruleId: `vitest/no-identical-title`,
  },
  {
    name: `a call with too many arguments in JavaScript`,
    path: `index.js`,
    code: `export const x = Math.abs(1, 2)\n`,
    ruleId: `unicorn/no-invalid-argument-count`,
  },
  {
    name: `a devDependency imported from published code`,
    path: `src/index.js`,
    code: devDependencyImportCode,
    otherFiles: devDependencyFiles,
    ruleId: `import/no-extraneous-dependencies`,
  },
])(`reports $name`, async ({ path, code, otherFiles, ruleId }) => {
  const ruleIds = await lintFile(path, code, otherFiles)

  expect(ruleIds).toContain(ruleId)
})

test.each([`src/index.test.ts.snap`, `src/fixture.test.yaml`])(
  `doesn't lint the non-JavaScript test file %s`,
  async path => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: config,
    })

    const fileConfig: unknown = await eslint.calculateConfigForFile(path)

    expect(fileConfig).toBeUndefined()
  },
)

test.each([
  {
    name: `a test whose only assertions are expectTypeOf calls`,
    path: `src/index.test.js`,
    code: `import { expectTypeOf, test } from 'vitest'\n\ntest('types', () => {\n  expectTypeOf(1).toEqualTypeOf(2)\n})\n`,
    ruleId: `vitest/expect-expect`,
  },
  {
    name: `an expect in a fast-check property test`,
    path: `src/index.test.js`,
    code: `import { fc, test } from '@fast-check/vitest'\nimport { expect } from 'vitest'\n\ntest.prop([fc.nat()])('works', n => {\n  expect(n).toBe(n)\n})\n`,
    ruleId: `vitest/no-standalone-expect`,
  },
  {
    name: `CommonJS in a Markdown code block`,
    path: `readme.md`,
    code: `# Title\n\n\`\`\`js\nmodule.exports = {}\n\`\`\`\n`,
    ruleId: `unicorn/prefer-module`,
  },
  {
    name: `a devDependency imported from a test helper`,
    path: `src/testing/helpers.js`,
    code: devDependencyImportCode,
    otherFiles: devDependencyFiles,
    ruleId: `import/no-extraneous-dependencies`,
  },
  {
    name: `a call with too many arguments in TypeScript, which TypeScript reports`,
    path: `index.ts`,
    code: `export const x = Math.abs(1, 2)\n`,
    ruleId: `unicorn/no-invalid-argument-count`,
  },
])(`doesn't report $name`, async ({ path, code, otherFiles, ruleId }) => {
  const ruleIds = await lintFile(path, code, otherFiles)

  expect(ruleIds).not.toContain(ruleId)
})
