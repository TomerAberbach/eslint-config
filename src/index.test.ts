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
  return <p>{fullName}</p>
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
])(`reports $name`, async ({ path, code, ruleId }) => {
  const ruleIds = await lintFile(path, code)

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
