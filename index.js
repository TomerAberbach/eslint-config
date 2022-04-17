const readPkgUp = require(`read-pkg-up`)
const browserslist = require(`browserslist`)

module.exports = {
  parserOptions: {
    ecmaVersion: `latest`,
    sourceType: `module`,
    ecmaFeatures: {
      impliedStrict: true,
    },
  },
  env: {
    ...getBaseEnv(),
    es2017: true,
    es2020: true,
    es2021: true,
    worker: true,
    serviceworker: true,
    webextensions: true,
    'jest/globals': true,
  },
  plugins: [`import`, `jest`],
  rules: {
    // Possible errors
    'for-direction': `error`,
    'getter-return': `error`,
    'no-async-promise-executor': `error`,
    'no-compare-neg-zero': `error`,
    'no-cond-assign': [`error`, `except-parens`],
    'no-constant-condition': `error`,
    'no-control-regex': `error`,
    'no-debugger': `error`,
    'no-dupe-args': `error`,
    'no-dupe-else-if': `error`,
    'no-dupe-keys': `error`,
    'no-duplicate-case': `error`,
    'no-empty': [`error`, { allowEmptyCatch: true }],
    'no-empty-character-class': `error`,
    'no-ex-assign': `error`,
    'no-extra-boolean-cast': [`error`, { enforceForLogicalOperands: true }],
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
    'no-obj-calls': `error`,
    'no-prototype-builtins': `error`,
    'no-regex-spaces': `error`,
    'no-setter-return': `error`,
    'no-sparse-arrays': `error`,
    'no-template-curly-in-string': `error`,
    'no-unreachable': `error`,
    'no-unsafe-finally': `error`,
    'no-unsafe-negation': [`error`, { enforceForOrderingRelations: true }],
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

    // Best practices
    'array-callback-return': [
      `error`,
      {
        allowImplicit: false,
        checkForEach: false,
      },
    ],
    'class-methods-use-this': `error`,
    'consistent-return': [`error`, { treatUndefinedAsUnspecified: false }],
    curly: [`error`, `all`],
    'default-case': [`error`, { commentPattern: `^Skip default$` }],
    'default-case-last': `error`,
    'default-param-last': `error`,
    'dot-notation': [`error`, { allowKeywords: true }],
    eqeqeq: [`error`, `always`, { null: `ignore` }],
    'grouped-accessor-pairs': [`error`, `getBeforeSet`],
    'guard-for-in': `error`,
    'no-case-declarations': `error`,
    'no-constructor-return': `error`,
    'no-else-return': [`error`, { allowElseIf: false }],
    'no-empty-function': `error`,
    'no-empty-pattern': `error`,
    'no-eval': `error`,
    'no-extend-native': `error`,
    'no-extra-bind': `error`,
    'no-extra-label': `error`,
    'no-fallthrough': [`error`, { commentPattern: `^Falls through$` }],
    'no-global-assign': `error`,
    'no-implicit-coercion': `error`,
    'no-implicit-globals': [`error`, { lexicalBindings: true }],
    'no-implied-eval': `error`,
    'no-invalid-this': [`error`, { capIsConstructor: true }],
    'no-iterator': `error`,
    'no-labels': [
      `error`,
      {
        allowLoop: true,
        allowSwitch: false,
      },
    ],
    'no-lone-blocks': `error`,
    'no-loop-func': `error`,
    'no-multi-str': `error`,
    'no-new': `error`,
    'no-new-func': `error`,
    'no-new-wrappers': `error`,
    'no-octal': `error`,
    'no-octal-escape': `error`,
    'no-proto': `error`,
    'no-redeclare': `error`,
    'no-return-assign': [`error`, `except-parens`],
    'no-return-await': `error`,
    'no-self-assign': `error`,
    'no-self-compare': `error`,
    'no-sequences': `error`,
    'no-throw-literal': `error`,
    'no-unmodified-loop-condition': `error`,
    'no-unused-expressions': `error`,
    'no-unused-labels': `error`,
    'no-useless-call': `error`,
    'no-useless-catch': `error`,
    'no-useless-concat': `error`,
    'no-useless-escape': `error`,
    'no-useless-return': `error`,
    'no-with': `error`,
    'prefer-named-capture-group': `error`,
    'prefer-promise-reject-errors': `error`,
    'prefer-regex-literals': `error`,
    radix: `error`,
    'require-await': `error`,
    'require-unicode-regexp': `error`,
    yoda: `error`,

    // Variables
    'no-delete-var': `error`,
    'no-label-var': `error`,
    'no-shadow-restricted-names': `error`,
    'no-undef': `error`,
    'no-undef-init': `error`,
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

    // Stylistic issues
    camelcase: `error`,
    'capitalized-comments': [
      `error`,
      `always`,
      { ignoreConsecutiveComments: true },
    ],
    'consistent-this': [`error`, `self`],
    'func-names': [`error`, `never`],
    'func-style': [`error`, `declaration`, { allowArrowFunctions: true }],
    'line-comment-position': `error`,
    'lines-between-class-members': [
      `error`,
      `always`,
      { exceptAfterSingleLine: true },
    ],
    'new-cap': `error`,
    'no-array-constructor': `error`,
    'no-inline-comments': `error`,
    'no-lonely-if': `error`,
    'no-multi-assign': `error`,
    'no-new-object': `error`,
    'no-tabs': `error`,
    'no-unneeded-ternary': `error`,
    'one-var': [`error`, `never`],
    'operator-assignment': `error`,
    'prefer-exponentiation-operator': `error`,
    'prefer-object-spread': `error`,
    quotes: [`error`, `backtick`],
    'spaced-comment': `error`,

    // ES6
    'arrow-body-style': `error`,
    'constructor-super': `error`,
    'no-class-assign': `error`,
    'no-const-assign': `error`,
    'no-dupe-class-members': `error`,
    'no-new-symbol': `error`,
    'no-this-before-super': `error`,
    'no-useless-computed-key': `error`,
    'no-useless-constructor': `error`,
    'no-useless-rename': `error`,
    'no-var': `error`,
    'object-shorthand': `error`,
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
    'prefer-numeric-literals': `error`,
    'prefer-rest-params': `error`,
    'prefer-spread': `error`,
    'prefer-template': `error`,
    'require-yield': `error`,
    'symbol-description': `error`,

    'sort-imports': [`error`, { ignoreDeclarationSort: true }],
    'import/order': `error`,
    'import/no-absolute-path': `error`,
    'import/no-dynamic-require': `error`,
    'import/no-self-import': `error`,
    'import/no-useless-path-segments': `error`,
    'import/export': `error`,
    'import/no-named-as-default': `error`,
    'import/no-named-as-default-member': `error`,
    'import/no-deprecated': `error`,
    'import/no-mutable-exports': `error`,
    'import/first': `error`,
    'import/no-duplicates': `error`,
    'import/newline-after-import': `error`,

    'jest/consistent-test-it': [
      `error`,
      { fn: `test`, withinDescribe: `test` },
    ],
    'jest/expect-expect': [
      `error`,
      { additionalTestBlockFunctions: [`testProp`] },
    ],
    'jest/no-alias-methods': `error`,
    'jest/no-commented-out-tests': `error`,
    'jest/no-conditional-expect': `error`,
    'jest/no-conditional-in-test': `error`,
    'jest/no-done-callback': `error`,
    'jest/no-export': `error`,
    'jest/no-focused-tests': `error`,
    'jest/no-identical-title': `error`,
    'jest/no-interpolation-in-snapshots': `error`,
    'jest/no-jasmine-globals': `error`,
    'jest/no-jest-import': `error`,
    'jest/no-standalone-expect': [
      `error`,
      { additionalTestBlockFunctions: [`testProp`] },
    ],
    'jest/no-test-prefixes': `error`,
    'jest/no-test-return-statement': `error`,
    'jest/prefer-comparison-matcher': `error`,
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
  },
  overrides: [
    {
      files: `*.{js,mjs,jsx}`,
      parser: require.resolve(`@babel/eslint-parser`),
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          configFile: require.resolve(`./babel.config.json`),
        },
      },
    },
    {
      files: `*.{jsx,tsx}`,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      settings: {
        react: {
          version: `detect`,
        },
      },
      plugins: [`jsx-a11y`, `react`, `react-hooks`],
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
      files: `*.{ts,tsx}`,
      parser: require.resolve(`@typescript-eslint/parser`),
      parserOptions: {
        project: `tsconfig.json`,
      },
      plugins: [`@typescript-eslint`],
      rules: {
        '@typescript-eslint/adjacent-overload-signatures': `error`,
        '@typescript-eslint/array-type': `error`,
        '@typescript-eslint/await-thenable': `error`,
        '@typescript-eslint/ban-ts-comment': `error`,
        '@typescript-eslint/ban-types': `error`,
        '@typescript-eslint/class-literal-property-style': `error`,
        '@typescript-eslint/consistent-indexed-object-style': `error`,
        '@typescript-eslint/consistent-type-assertions': `error`,
        '@typescript-eslint/consistent-type-definitions': [`error`, `type`],
        '@typescript-eslint/consistent-type-exports': `error`,
        '@typescript-eslint/consistent-type-imports': `error`,
        '@typescript-eslint/explicit-function-return-type': `error`,
        '@typescript-eslint/explicit-member-accessibility': `error`,
        '@typescript-eslint/explicit-module-boundary-types': `error`,
        '@typescript-eslint/method-signature-style': `error`,
        '@typescript-eslint/no-confusing-non-null-assertion': `error`,
        '@typescript-eslint/no-confusing-void-expression': [
          `error`,
          {
            ignoreArrowShorthand: true,
            ignoreVoidOperator: true,
          },
        ],
        '@typescript-eslint/no-empty-interface': [
          `error`,
          {
            allowSingleExtends: true,
          },
        ],
        '@typescript-eslint/no-explicit-any': `error`,
        '@typescript-eslint/no-extra-non-null-assertion': `error`,
        '@typescript-eslint/no-extraneous-class': `error`,
        '@typescript-eslint/no-floating-promises': `error`,
        '@typescript-eslint/no-implicit-any-catch': `error`,
        '@typescript-eslint/no-inferrable-types': `error`,
        '@typescript-eslint/no-invalid-void-type': `error`,
        '@typescript-eslint/no-misused-new': `error`,
        '@typescript-eslint/no-misused-promises': `error`,
        '@typescript-eslint/no-namespace': `error`,
        '@typescript-eslint/no-non-null-asserted-optional-chain': `error`,
        '@typescript-eslint/no-parameter-properties': `error`,
        '@typescript-eslint/no-require-imports': `error`,
        '@typescript-eslint/no-this-alias': `error`,
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': `error`,
        '@typescript-eslint/no-unnecessary-condition': `error`,
        '@typescript-eslint/no-unnecessary-qualifier': `error`,
        '@typescript-eslint/no-unnecessary-type-arguments': `error`,
        '@typescript-eslint/no-unnecessary-type-assertion': `error`,
        '@typescript-eslint/no-unnecessary-type-constraint': `error`,
        '@typescript-eslint/no-unsafe-assignment': `error`,
        '@typescript-eslint/no-unsafe-call': `error`,
        '@typescript-eslint/no-unsafe-member-access': `error`,
        '@typescript-eslint/no-unsafe-return': `error`,
        '@typescript-eslint/non-nullable-type-assertion-style': `error`,
        '@typescript-eslint/prefer-as-const': `error`,
        '@typescript-eslint/prefer-function-type': `error`,
        '@typescript-eslint/prefer-includes': `error`,
        '@typescript-eslint/prefer-namespace-keyword': `error`,
        '@typescript-eslint/prefer-nullish-coalescing': `error`,
        '@typescript-eslint/prefer-optional-chain': `error`,
        '@typescript-eslint/prefer-readonly': `error`,
        '@typescript-eslint/prefer-reduce-type-parameter': `error`,
        '@typescript-eslint/prefer-regexp-exec': `error`,
        '@typescript-eslint/prefer-string-starts-ends-with': `error`,
        '@typescript-eslint/prefer-ts-expect-error': `error`,
        '@typescript-eslint/restrict-plus-operands': [
          `error`,
          {
            checkCompoundAssignments: true,
          },
        ],
        '@typescript-eslint/switch-exhaustiveness-check': `error`,
        '@typescript-eslint/triple-slash-reference': [
          `error`,
          {
            path: `never`,
            types: `never`,
            lib: `never`,
          },
        ],
        '@typescript-eslint/type-annotation-spacing': `error`,
        '@typescript-eslint/unbound-method': `error`,
        '@typescript-eslint/unified-signatures': `error`,

        'no-undef': `off`,
        'dot-notation': `off`,
        '@typescript-eslint/dot-notation': `error`,
        'lines-between-class-members': `off`,
        '@typescript-eslint/lines-between-class-members': [
          `error`,
          `always`,
          { exceptAfterSingleLine: true },
        ],
        'no-array-constructor': `off`,
        '@typescript-eslint/no-array-constructor': `error`,
        'no-empty-function': `off`,
        '@typescript-eslint/no-empty-function': `error`,
        'no-implied-eval': `off`,
        '@typescript-eslint/no-implied-eval': `error`,
        'no-invalid-this': `off`,
        '@typescript-eslint/no-invalid-this': `error`,
        'no-loop-func': `off`,
        '@typescript-eslint/no-loop-func': `error`,
        'no-loss-of-precision': `off`,
        '@typescript-eslint/no-loss-of-precision': `error`,
        'no-redeclare': `off`,
        '@typescript-eslint/no-redeclare': `error`,
        'no-throw-literal': `off`,
        '@typescript-eslint/no-throw-literal': `error`,
        'no-unused-vars': `off`,
        '@typescript-eslint/no-unused-vars': `error`,
        'no-use-before-define': `off`,
        '@typescript-eslint/no-use-before-define': [
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
        '@typescript-eslint/no-useless-constructor': `error`,
        quotes: `off`,
        '@typescript-eslint/quotes': [`error`, `backtick`],
        'require-await': `off`,
        '@typescript-eslint/require-await': `error`,
        'no-return-await': `off`,
        '@typescript-eslint/no-return-await': `off`,
        'no-dupe-class-members': `off`,
        '@typescript-eslint/no-dupe-class-members': `error`,
      },
    },
    {
      files: `*.tsx`,
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': `off`,
        '@typescript-eslint/explicit-function-return-type': `off`,
        '@typescript-eslint/no-throw-literal': `off`,
      },
    },
  ],
}

function getBaseEnv() {
  const isNode = isNodeSupported()
  const isBrowser = isBrowserSupported()

  if (isNode && isBrowser) {
    return {
      'shared-node-browser': true,
    }
  }

  if (isNode) {
    return { node: true }
  }

  if (isBrowser) {
    return { browser: true }
  }

  return {}
}

function isNodeSupported() {
  const { packageJson = {} } = readPkgUp.sync() || {}
  const { engines = {} } = packageJson

  return Boolean(engines.node)
}

function isBrowserSupported() {
  return Boolean(browserslist.findConfig(process.cwd()))
}
