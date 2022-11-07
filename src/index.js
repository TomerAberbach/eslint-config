import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { readPackageUp } from 'read-pkg-up'
import browserslist from 'browserslist'
import importPlugin from 'eslint-plugin-import'
import jestPlugin from 'eslint-plugin-jest'
import globals from 'globals'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import reactPlugin from 'eslint-plugin-react'
import jestDomPlugin from 'eslint-plugin-jest-dom'
import testingLibraryPlugin from 'eslint-plugin-testing-library'
import tsDocPlugin from 'eslint-plugin-tsdoc'
import unicornPlugin from 'eslint-plugin-unicorn'
import markdownPlugin from 'eslint-plugin-markdown'
import sonarjsPlugin from 'eslint-plugin-sonarjs'
import typescriptParser from './parsers/typescript-parser.js'
import jsxBabelParser from './parsers/jsx-babel-parser.js'
import babelParser from './parsers/babel-parser.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const getParserPath = parserName =>
  join(__dirname, `./parsers/${parserName}-parser.js`)

const getBaseGlobals = async () => {
  const isNode = await isNodeSupported()
  const isBrowser = isBrowserSupported()

  if (isNode && isBrowser) {
    return globals[`shared-node-browser`]
  }

  if (isNode) {
    return { ...globals.node, ...globals.worker }
  }

  if (isBrowser) {
    return { ...globals.browser, ...globals.serviceworker }
  }

  return {}
}

const isNodeSupported = async () => {
  const { packageJson = {} } = (await readPackageUp()) ?? {}
  const { engines = {} } = packageJson

  return Boolean(engines.node)
}

const isBrowserSupported = () => Boolean(browserslist.findConfig(process.cwd()))

export default [
  {
    languageOptions: { globals: await getBaseGlobals() },
    settings: {
      'import/parsers': {
        [getParserPath(`babel`)]: [`.js`, `.cjs`, `.mjs`],
        [getParserPath(`jsx-babel`)]: [`.jsx`],
        [getParserPath(`typescript`)]: [`.ts`, `.cts`, `.mts`, `.tsx`],
      },
    },
    plugins: {
      import: importPlugin,
      unicorn: unicornPlugin,
      sonarjs: sonarjsPlugin,
    },
    rules: {
      // Possible problems
      'array-callback-return': [
        `error`,
        {
          allowImplicit: false,
          checkForEach: false,
        },
      ],
      'constructor-super': `error`,
      'for-direction': `error`,
      'getter-return': `error`,
      'no-async-promise-executor': `error`,
      'no-class-assign': `error`,
      'no-compare-neg-zero': `error`,
      'no-cond-assign': [`error`, `except-parens`],
      'no-const-assign': `error`,
      'no-constant-binary-expression': `error`,
      'no-constant-condition': [`error`, { checkLoops: false }],
      'no-constructor-return': `error`,
      'no-control-regex': `error`,
      'no-debugger': `error`,
      'no-dupe-args': `error`,
      'no-dupe-class-members': `error`,
      'no-dupe-else-if': `error`,
      'no-dupe-keys': `error`,
      'no-duplicate-case': `error`,
      'no-empty-character-class': `error`,
      'no-empty-pattern': `error`,
      'no-ex-assign': `error`,
      'no-fallthrough': [`error`, { commentPattern: `^Falls through$` }],
      'no-func-assign': `error`,
      'no-import-assign': `error`,
      'no-inner-declarations': [`error`, `both`],
      'no-invalid-regexp': `error`,
      'no-irregular-whitespace': [
        `error`,
        {
          skipStrings: false,
          skipComments: false,
          skipRegExps: false,
          skipTemplates: false,
        },
      ],
      'no-loss-of-precision': `error`,
      'no-misleading-character-class': `error`,
      'no-new-symbol': `error`,
      'no-obj-calls': `error`,
      'no-prototype-builtins': `error`,
      'no-restricted-syntax': [
        `error`,
        `FunctionExpression[generator=false]`,
        `FunctionDeclaration[generator=false]`,
      ],
      'no-self-assign': `error`,
      'no-self-compare': `error`,
      'no-setter-return': `error`,
      'no-sparse-arrays': `error`,
      'no-template-curly-in-string': `error`,
      'no-this-before-super': `error`,
      'no-undef': `error`,
      'no-unexpected-multiline': `error`,
      'no-unmodified-loop-condition': `error`,
      'no-unreachable': `error`,
      'no-unreachable-loop': `error`,
      'no-unsafe-finally': `error`,
      'no-unsafe-negation': [`error`, { enforceForOrderingRelations: true }],
      'no-unsafe-optional-chaining': [
        `error`,
        { disallowArithmeticOperators: true },
      ],
      'no-unused-private-class-members': `error`,
      'no-unused-vars': [
        `error`,
        {
          vars: `all`,
          args: `after-used`,
          ignoreRestSiblings: true,
          caughtErrors: `all`,
        },
      ],
      'no-use-before-define': [
        `error`,
        { functions: false, classes: false, variables: false },
      ],
      'no-useless-backreference': `error`,
      'require-atomic-updates': `error`,
      'use-isnan': [
        `error`,
        {
          enforceForSwitchCase: true,
          enforceForIndexOf: true,
        },
      ],
      'valid-typeof': [`error`, { requireStringLiterals: false }],

      // Suggestions
      'arrow-body-style': `error`,
      camelcase: `error`,
      'capitalized-comments': [
        `error`,
        `always`,
        { ignoreConsecutiveComments: true },
      ],
      'class-methods-use-this': `error`,
      'consistent-return': [`error`, { treatUndefinedAsUnspecified: false }],
      'consistent-this': [`error`, `self`],
      curly: [`error`, `all`],
      'default-case': [`error`, { commentPattern: `^Skip default$` }],
      'default-case-last': `error`,
      'default-param-last': `error`,
      'dot-notation': [`error`, { allowKeywords: true }],
      eqeqeq: [`error`, `always`, { null: `ignore` }],
      'func-name-matching': `error`,
      'func-names': [`error`, `never`],
      'func-style': [`error`, `declaration`, { allowArrowFunctions: true }],
      'grouped-accessor-pairs': [`error`, `getBeforeSet`],
      'guard-for-in': `error`,
      'logical-assignment-operators': `error`,
      'new-cap': `error`,
      'no-alert': `error`,
      'no-array-constructor': `error`,
      'no-case-declarations': `error`,
      'no-delete-var': `error`,
      'no-else-return': [`error`, { allowElseIf: false }],
      'no-empty': [`error`, { allowEmptyCatch: true }],
      'no-empty-function': `error`,
      'no-eval': `error`,
      'no-extend-native': `error`,
      'no-extra-bind': `error`,
      'no-extra-boolean-cast': [`error`, { enforceForLogicalOperands: true }],
      'no-extra-label': `error`,
      'no-global-assign': `error`,
      'no-implicit-coercion': `error`,
      'no-implicit-globals': [`error`, { lexicalBindings: true }],
      'no-implied-eval': `error`,
      'no-inline-comments': `error`,
      'no-invalid-this': [`error`, { capIsConstructor: true }],
      'no-iterator': `error`,
      'no-label-var': `error`,
      'no-labels': [
        `error`,
        {
          allowLoop: true,
          allowSwitch: false,
        },
      ],
      'no-lone-blocks': `error`,
      'no-lonely-if': `error`,
      'no-loop-func': `error`,
      'no-multi-assign': `error`,
      'no-multi-str': `error`,
      'no-new': `error`,
      'no-new-func': `error`,
      'no-new-object': `error`,
      'no-new-wrappers': `error`,
      'no-octal': `error`,
      'no-octal-escape': `error`,
      'no-proto': `error`,
      'no-redeclare': `error`,
      'no-regex-spaces': `error`,
      'no-return-assign': [`error`, `except-parens`],
      'no-return-await': `error`,
      'no-sequences': `error`,
      'no-shadow-restricted-names': `error`,
      'no-throw-literal': `error`,
      'no-undef-init': `error`,
      'no-unneeded-ternary': `error`,
      'no-unused-expressions': `error`,
      'no-unused-labels': `error`,
      'no-useless-call': `error`,
      'no-useless-catch': `error`,
      'no-useless-computed-key': `error`,
      'no-useless-concat': `error`,
      'no-useless-constructor': `error`,
      'no-useless-escape': `error`,
      'no-useless-rename': `error`,
      'no-useless-return': `error`,
      'no-var': `error`,
      'no-with': `error`,
      'object-shorthand': `error`,
      'one-var': [`error`, `never`],
      'operator-assignment': `error`,
      'prefer-arrow-callback': `error`,
      'prefer-const': [`error`, { destructuring: `all` }],
      'prefer-destructuring': [
        `error`,
        {
          array: false,
          object: true,
        },
        { enforceForRenamedProperties: false },
      ],
      'prefer-exponentiation-operator': `error`,
      'prefer-named-capture-group': `error`,
      'prefer-numeric-literals': `error`,
      'prefer-object-spread': `error`,
      'prefer-promise-reject-errors': `error`,
      'prefer-regex-literals': `error`,
      'prefer-rest-params': `error`,
      'prefer-spread': `error`,
      'prefer-template': `error`,
      radix: `error`,
      'require-await': `error`,
      'require-unicode-regexp': `error`,
      'require-yield': `error`,
      'spaced-comment': `error`,
      'symbol-description': `error`,
      yoda: `error`,

      // Layout and formatting
      'line-comment-position': `error`,
      'lines-between-class-members': [
        `error`,
        `always`,
        { exceptAfterSingleLine: true },
      ],
      'no-tabs': `error`,
      quotes: [`error`, `backtick`],

      'sort-imports': [`error`, { ignoreDeclarationSort: true }],
      'import/no-absolute-path': `error`,
      'import/no-dynamic-require': `error`,
      'import/no-self-import': `error`,
      'import/no-useless-path-segments': `error`,
      'import/export': `error`,
      'import/no-named-as-default': `error`,
      'import/no-named-as-default-member': `error`,
      'import/no-extraneous-dependencies': `error`,
      'import/no-mutable-exports': `error`,
      'import/first': `error`,
      'import/no-duplicates': `error`,
      'import/order': `error`,
      'import/newline-after-import': `error`,
      'import/extensions': [`error`, `ignorePackages`],

      'unicorn/better-regex': `error`,
      'unicorn/catch-error-name': `error`,
      'unicorn/consistent-destructuring': `error`,
      'unicorn/consistent-function-scoping': `error`,
      'unicorn/custom-error-definition': `error`,
      'unicorn/error-message': `error`,
      'unicorn/escape-case': `error`,
      'unicorn/filename-case': [
        `error`,
        { case: `kebabCase`, ignore: [`\\$`] },
      ],
      'unicorn/new-for-builtins': `error`,
      'unicorn/no-array-push-push': `error`,
      'unicorn/no-for-loop': `error`,
      'unicorn/no-instanceof-array': `error`,
      'unicorn/no-invalid-remove-event-listener': `error`,
      'unicorn/no-lonely-if': `error`,
      'unicorn/no-new-array': `error`,
      'unicorn/no-new-buffer': `error`,
      'unicorn/no-object-as-default-parameter': `error`,
      'unicorn/no-static-only-class': `error`,
      'unicorn/no-thenable': `error`,
      'unicorn/no-this-assignment': `error`,
      'unicorn/no-unreadable-array-destructuring': `error`,
      'unicorn/no-unreadable-iife': `error`,
      'unicorn/no-unsafe-regex': `error`,
      'unicorn/no-useless-fallback-in-spread': `error`,
      'unicorn/no-useless-length-check': `error`,
      'unicorn/no-useless-promise-resolve-reject': `error`,
      'unicorn/no-useless-spread': `error`,
      'unicorn/no-useless-switch-case': `error`,
      'unicorn/no-zero-fractions': `error`,
      'unicorn/number-literal-case': `error`,
      'unicorn/numeric-separators-style': `error`,
      'unicorn/prefer-add-event-listener': `error`,
      'unicorn/prefer-array-find': `error`,
      'unicorn/prefer-array-flat': `error`,
      'unicorn/prefer-array-flat-map': `error`,
      'unicorn/prefer-array-index-of': `error`,
      'unicorn/prefer-array-some': `error`,
      'unicorn/prefer-date-now': `error`,
      'unicorn/prefer-default-parameters': `error`,
      'unicorn/prefer-dom-node-append': `error`,
      'unicorn/prefer-dom-node-dataset': `error`,
      'unicorn/prefer-dom-node-remove': `error`,
      'unicorn/prefer-dom-node-text-content': `error`,
      'unicorn/prefer-event-target': `error`,
      'unicorn/prefer-export-from': `error`,
      'unicorn/prefer-includes': `error`,
      'unicorn/prefer-json-parse-buffer': `error`,
      'unicorn/prefer-keyboard-event-key': `error`,
      'unicorn/prefer-logical-operator-over-ternary': `error`,
      'unicorn/prefer-math-trunc': `error`,
      'unicorn/prefer-modern-dom-apis': `error`,
      'unicorn/prefer-modern-math-apis': `error`,
      'unicorn/prefer-negative-index': `error`,
      'unicorn/prefer-object-from-entries': `error`,
      'unicorn/prefer-optional-catch-binding': `error`,
      'unicorn/prefer-prototype-methods': `error`,
      'unicorn/prefer-regexp-test': `error`,
      'unicorn/prefer-set-has': `error`,
      'unicorn/prefer-spread': `error`,
      'unicorn/prefer-string-replace-all': `error`,
      'unicorn/prefer-string-slice': `error`,
      'unicorn/prefer-string-starts-ends-with': `error`,
      'unicorn/prefer-string-trim-start-end': `error`,
      'unicorn/prefer-switch': `error`,
      'unicorn/prefer-ternary': `error`,
      'unicorn/prefer-type-error': `error`,
      'unicorn/relative-url-style': `error`,
      'unicorn/require-array-join-separator': `error`,
      'unicorn/require-number-to-fixed-digits-argument': `error`,
      'unicorn/require-post-message-target-origin': `error`,
      'unicorn/switch-case-braces': [`error`, `avoid`],
      'unicorn/throw-new-error': `error`,

      'sonarjs/no-all-duplicated-branches': `error`,
      'sonarjs/no-element-overwrite': `error`,
      'sonarjs/no-empty-collection': `error`,
      'sonarjs/no-extra-arguments': `error`,
      'sonarjs/no-identical-conditions': `error`,
      'sonarjs/no-ignored-return': `error`,
      'sonarjs/no-use-of-empty-return-value': `error`,
    },
  },
  {
    files: [`**/*.config.{js,cjs,mjs,jsx,ts,cts,mts,tsx}`],
    languageOptions: { globals: globals.node },
  },
  {
    files: [`test/**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}`],
    languageOptions: { globals: { ...globals.node, ...globals.jest } },
    plugins: {
      jest: jestPlugin,
      'testing-library': testingLibraryPlugin,
      'jest-dom': jestDomPlugin,
    },
    rules: {
      'jest/consistent-test-it': [
        `error`,
        { fn: `test`, withinDescribe: `test` },
      ],
      'jest/expect-expect': [
        `error`,
        {
          assertFunctionNames: [`expect`, `expectTypeOf`],
          additionalTestBlockFunctions: [`testProp`],
        },
      ],
      'jest/no-alias-methods': `error`,
      'jest/no-commented-out-tests': `error`,
      'jest/no-conditional-expect': `error`,
      'jest/no-conditional-in-test': `error`,
      'jest/no-deprecated-functions': `error`,
      'jest/no-done-callback': `error`,
      'jest/no-export': `error`,
      'jest/no-focused-tests': `error`,
      'jest/no-identical-title': `error`,
      'jest/no-interpolation-in-snapshots': `error`,
      'jest/no-jasmine-globals': `error`,
      'jest/no-mocks-import': `error`,
      'jest/no-standalone-expect': [
        `error`,
        { additionalTestBlockFunctions: [`testProp`] },
      ],
      'jest/no-test-prefixes': `error`,
      'jest/no-test-return-statement': `error`,
      'jest/prefer-comparison-matcher': `error`,
      'jest/prefer-each': `error`,
      'jest/prefer-equality-matcher': `error`,
      'jest/prefer-hooks-on-top': `error`,
      'jest/prefer-snapshot-hint': `error`,
      'jest/prefer-spy-on': `error`,
      'jest/prefer-strict-equal': `error`,
      'jest/prefer-to-be': `error`,
      'jest/prefer-to-contain': `error`,
      'jest/prefer-to-have-length': `error`,
      'jest/prefer-todo': `error`,
      'jest/valid-describe-callback': `error`,
      'jest/valid-expect': `error`,
      'jest/valid-expect-in-promise': `error`,
      'jest/valid-title': `error`,

      'testing-library/await-async-query': `error`,
      'testing-library/await-async-utils': `error`,
      'testing-library/no-await-sync-events': `error`,
      'testing-library/no-await-sync-query': `error`,
      'testing-library/no-dom-import': `error`,
      'testing-library/no-global-regexp-flag-in-query': `error`,
      'testing-library/no-manual-cleanup': `error`,
      'testing-library/no-node-access': `error`,
      'testing-library/no-promise-in-fire-event': `error`,
      'testing-library/no-render-in-setup': `error`,
      'testing-library/no-unnecessary-act': `error`,
      'testing-library/no-wait-for-empty-callback': `error`,
      'testing-library/no-wait-for-multiple-assertions': `error`,
      'testing-library/no-wait-for-side-effects': `error`,
      'testing-library/no-wait-for-snapshot': `error`,
      'testing-library/prefer-explicit-assert': `error`,
      'testing-library/prefer-find-by': `error`,
      'testing-library/prefer-presence-queries': `error`,
      'testing-library/prefer-query-by-disappearance': `error`,
      'testing-library/prefer-screen-queries': `error`,
      'testing-library/prefer-user-event': `error`,
      'testing-library/prefer-wait-for': `error`,
      'testing-library/render-result-naming-convention': `error`,

      'jest-dom/prefer-checked': `error`,
      'jest-dom/prefer-empty': `error`,
      'jest-dom/prefer-enabled-disabled': `error`,
      'jest-dom/prefer-focus': `error`,
      'jest-dom/prefer-in-document': `error`,
      'jest-dom/prefer-required': `error`,
      'jest-dom/prefer-to-have-attribute': `error`,
      'jest-dom/prefer-to-have-class': `error`,
      'jest-dom/prefer-to-have-style': `error`,
      'jest-dom/prefer-to-have-text-content': `error`,
      'jest-dom/prefer-to-have-value': `error`,
    },
  },
  {
    files: [`**/*.{js,cjs,mjs}`],
    languageOptions: { parser: babelParser },
  },
  {
    files: [`**/*.jsx`],
    languageOptions: { parser: jsxBabelParser },
  },
  {
    files: [`**/*.{jsx,tsx}`],
    settings: { react: { version: `detect` } },
    plugins: {
      'jsx-a11y': jsxA11yPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      'no-throw-literal': `off`,

      'react/jsx-boolean-value': [`error`, `never`],
      'react/jsx-closing-bracket-location': [`error`, `line-aligned`],
      'react/jsx-closing-tag-location': `error`,
      'react/jsx-curly-spacing': `error`,
      'react/jsx-equals-spacing': `error`,
      'react/jsx-first-prop-new-line': [`error`, `multiline-multiprop`],
      'react/jsx-fragments': `error`,
      'react/jsx-indent-props': [`error`, 2],
      'react/jsx-no-comment-textnodes': `error`,
      'react/jsx-no-duplicate-props': `error`,
      'react/jsx-no-script-url': `error`,
      'react/jsx-no-target-blank': `error`,
      'react/jsx-no-undef': `error`,
      'react/jsx-no-useless-fragment': `error`,
      'react/jsx-pascal-case': `error`,
      'react/jsx-tag-spacing': `error`,
      'react/jsx-uses-vars': `error`,
      'react/jsx-wrap-multilines': [
        `error`,
        {
          declaration: `parens-new-line`,
          assignment: `parens-new-line`,
          return: `parens-new-line`,
          arrow: `parens-new-line`,
          condition: `ignore`,
          logical: `ignore`,
          prop: `ignore`,
        },
      ],
      'react/jsx-handler-names': `error`,
      'react/jsx-key': [`error`, { checkFragmentShorthand: true }],
      'react/jsx-no-bind': `error`,

      'react-hooks/rules-of-hooks': `error`,
      'react-hooks/exhaustive-deps': `error`,

      'jsx-a11y/accessible-emoji': `error`,
      'jsx-a11y/alt-text': `error`,
      'jsx-a11y/anchor-has-content': `error`,
      'jsx-a11y/anchor-is-valid': `error`,
      'jsx-a11y/aria-activedescendant-has-tabindex': `error`,
      'jsx-a11y/aria-props': `error`,
      'jsx-a11y/aria-proptypes': `error`,
      'jsx-a11y/aria-role': `error`,
      'jsx-a11y/aria-unsupported-elements': `error`,
      'jsx-a11y/autocomplete-valid': `error`,
      'jsx-a11y/click-events-have-key-events': `error`,
      'jsx-a11y/control-has-associated-label': [
        `off`,
        {
          ignoreElements: [
            `audio`,
            `canvas`,
            `embed`,
            `input`,
            `textarea`,
            `tr`,
            `video`,
          ],
          ignoreRoles: [
            `grid`,
            `listbox`,
            `menu`,
            `menubar`,
            `radiogroup`,
            `row`,
            `tablist`,
            `toolbar`,
            `tree`,
            `treegrid`,
          ],
          includeRoles: [`alert`, `dialog`],
        },
      ],
      'jsx-a11y/heading-has-content': `error`,
      'jsx-a11y/html-has-lang': `error`,
      'jsx-a11y/iframe-has-title': `error`,
      'jsx-a11y/img-redundant-alt': `error`,
      'jsx-a11y/interactive-supports-focus': [
        `error`,
        {
          tabbable: [
            `button`,
            `checkbox`,
            `link`,
            `progressbar`,
            `searchbox`,
            `slider`,
            `spinbutton`,
            `switch`,
            `textbox`,
          ],
        },
      ],
      'jsx-a11y/label-has-associated-control': `error`,
      'jsx-a11y/media-has-caption': `error`,
      'jsx-a11y/mouse-events-have-key-events': `error`,
      'jsx-a11y/no-access-key': `error`,
      'jsx-a11y/no-autofocus': `error`,
      'jsx-a11y/no-distracting-elements': `error`,
      'jsx-a11y/no-interactive-element-to-noninteractive-role': `error`,
      'jsx-a11y/no-noninteractive-element-interactions': [
        `error`,
        {
          body: [`onError`, `onLoad`],
          iframe: [`onError`, `onLoad`],
          img: [`onError`, `onLoad`],
        },
      ],
      'jsx-a11y/no-noninteractive-element-to-interactive-role': `error`,
      'jsx-a11y/no-noninteractive-tabindex': `error`,
      'jsx-a11y/no-redundant-roles': `error`,
      'jsx-a11y/no-static-element-interactions': `error`,
      'jsx-a11y/role-has-required-aria-props': `error`,
      'jsx-a11y/role-supports-aria-props': `error`,
      'jsx-a11y/scope': `error`,
      'jsx-a11y/tabindex-no-positive': `error`,
    },
  },
  {
    files: [`**/*.{ts,cts,mts,tsx}`],
    languageOptions: { parser: typescriptParser },
    plugins: {
      typescript: typescriptPlugin,
      tsdoc: tsDocPlugin,
    },
    rules: {
      'typescript/adjacent-overload-signatures': `error`,
      'typescript/array-type': `error`,
      'typescript/await-thenable': `error`,
      'typescript/ban-ts-comment': `error`,
      'typescript/ban-types': `error`,
      'typescript/class-literal-property-style': `error`,
      'typescript/consistent-indexed-object-style': `error`,
      'typescript/consistent-type-assertions': `error`,
      'typescript/consistent-type-definitions': [`error`, `type`],
      'typescript/consistent-type-exports': `error`,
      'typescript/consistent-type-imports': `error`,
      'typescript/explicit-member-accessibility': `error`,
      'typescript/explicit-module-boundary-types': `error`,
      'typescript/method-signature-style': `error`,
      'typescript/no-confusing-non-null-assertion': `error`,
      'typescript/no-confusing-void-expression': [
        `error`,
        {
          ignoreArrowShorthand: true,
          ignoreVoidOperator: true,
        },
      ],
      'typescript/no-empty-interface': [
        `error`,
        {
          allowSingleExtends: true,
        },
      ],
      'typescript/no-explicit-any': `error`,
      'typescript/no-extra-non-null-assertion': `error`,
      'typescript/no-extraneous-class': `error`,
      'typescript/no-floating-promises': `error`,
      'typescript/no-implicit-any-catch': `error`,
      'typescript/no-inferrable-types': `error`,
      'typescript/no-invalid-void-type': `error`,
      'typescript/no-misused-new': `error`,
      'typescript/no-misused-promises': `error`,
      'typescript/no-namespace': `error`,
      'typescript/no-non-null-asserted-optional-chain': `error`,
      'typescript/no-parameter-properties': `error`,
      'typescript/no-require-imports': `error`,
      'typescript/no-this-alias': `error`,
      'typescript/no-unnecessary-boolean-literal-compare': `error`,
      'typescript/no-unnecessary-condition': `error`,
      'typescript/no-unnecessary-qualifier': `error`,
      'typescript/no-unnecessary-type-arguments': `error`,
      'typescript/no-unnecessary-type-assertion': `error`,
      'typescript/no-unnecessary-type-constraint': `error`,
      'typescript/no-unsafe-assignment': `error`,
      'typescript/no-unsafe-call': `error`,
      'typescript/no-unsafe-member-access': `error`,
      'typescript/no-unsafe-return': `error`,
      'typescript/non-nullable-type-assertion-style': `error`,
      'typescript/prefer-as-const': `error`,
      'typescript/prefer-function-type': `error`,
      'typescript/prefer-includes': `error`,
      'typescript/prefer-namespace-keyword': `error`,
      'typescript/prefer-nullish-coalescing': `error`,
      'typescript/prefer-optional-chain': `error`,
      'typescript/prefer-readonly': `error`,
      'typescript/prefer-reduce-type-parameter': `error`,
      'typescript/prefer-regexp-exec': `error`,
      'typescript/prefer-string-starts-ends-with': `error`,
      'typescript/prefer-ts-expect-error': `error`,
      'typescript/restrict-plus-operands': [
        `error`,
        {
          checkCompoundAssignments: true,
        },
      ],
      'typescript/switch-exhaustiveness-check': `error`,
      'typescript/triple-slash-reference': [
        `error`,
        {
          path: `never`,
          types: `never`,
          lib: `never`,
        },
      ],
      'typescript/type-annotation-spacing': `error`,
      'typescript/unbound-method': `error`,
      'typescript/unified-signatures': `error`,

      'no-undef': `off`,
      'dot-notation': `off`,
      'typescript/dot-notation': `error`,
      'lines-between-class-members': `off`,
      'typescript/lines-between-class-members': [
        `error`,
        `always`,
        { exceptAfterSingleLine: true },
      ],
      'no-array-constructor': `off`,
      'typescript/no-array-constructor': `error`,
      'no-empty-function': `off`,
      'typescript/no-empty-function': `error`,
      'no-implied-eval': `off`,
      'typescript/no-implied-eval': `error`,
      'no-invalid-this': `off`,
      'typescript/no-invalid-this': `error`,
      'no-loop-func': `off`,
      'typescript/no-loop-func': `error`,
      'no-loss-of-precision': `off`,
      'typescript/no-loss-of-precision': `error`,
      'no-redeclare': `off`,
      'typescript/no-redeclare': `error`,
      'no-throw-literal': `off`,
      'typescript/no-throw-literal': `error`,
      'no-unused-vars': `off`,
      'typescript/no-unused-vars': [
        `error`,
        {
          vars: `all`,
          args: `after-used`,
          ignoreRestSiblings: true,
          caughtErrors: `all`,
        },
      ],
      'no-use-before-define': `off`,
      'typescript/no-use-before-define': [
        `error`,
        {
          functions: false,
          classes: false,
          variables: false,
          enums: false,
          typedefs: false,
        },
      ],
      'no-useless-constructor': `error`,
      'typescript/no-useless-constructor': `error`,
      quotes: `off`,
      'typescript/quotes': [`error`, `backtick`],
      'require-await': `off`,
      'typescript/require-await': `error`,
      'no-return-await': `off`,
      'typescript/no-return-await': `off`,
      'no-dupe-class-members': `off`,
      'typescript/no-dupe-class-members': `error`,

      'tsdoc/syntax': `error`,
    },
  },
  {
    files: [`**/*.tsx`],
    plugins: { typescript: typescriptPlugin },
    rules: {
      'typescript/explicit-module-boundary-types': `off`,
      'typescript/no-throw-literal': `off`,
    },
  },
  {
    files: [`**/*.md`],
    plugins: { markdown: markdownPlugin },
    processor: `markdown/markdown`,
  },
  {
    files: [`**/*.md/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}`],
    rules: {
      'no-empty-function': `off`,
      'no-undef': `off`,
      'spaced-comment': [`error`, `always`, { line: { markers: [`=>`] } }],
    },
  },
]
