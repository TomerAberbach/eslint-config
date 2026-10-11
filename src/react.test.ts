// The React plugin caches the first version it detects, or fails to detect, for
// the whole process. Vitest isolates modules per test file, so this test needs a
// file without other React tests
import { expect, test } from 'vitest'
import { lintFile } from './testing.ts'

test(`detects the installed React version`, async () => {
  // `ReactDOM.render` is deprecated as of React 18. The React plugin assumes
  // the latest version when it fails to detect one. The unclosed empty element
  // shows that the React rules ran
  const reactDomRenderCode = `import ReactDOM from 'react-dom'

ReactDOM.render(<div></div>, document.body)
`
  const react17Files = {
    'node_modules/react/package.json': JSON.stringify({ name: `react` }),
    'node_modules/react/index.js': `module.exports = { version: '17.0.2' }`,
  }

  const ruleIds = await lintFile(`index.jsx`, reactDomRenderCode, react17Files)

  expect(ruleIds).toContain(`react/self-closing-comp`)
  expect(ruleIds).not.toContain(`react/no-deprecated`)
})
