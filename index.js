module.exports = {
  parser: require.resolve(`babel-eslint`),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: `module`,
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true
    }
  },
  settings: {
    react: {
      version: `detect`
    }
  },
  env: {
    browser: true,
    node: true,
    es2017: true,
    es2020: true,
    worker: true,
    serviceworker: true,
    webextensions: true
  },
  plugins: [`sort-imports-es6-autofix`, `compat`, `jsx-a11y`, `react`, `ava`],
  extends: [`plugin:ava/recommended`],
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
        skipTemplates: false
      }
    ],
    'no-loss-of-precision': `error`,
    'no-misleading-character-class': `error`,
    'no-obj-calls': `error`,
    'no-prototype-builtins': `error`,
    'no-regex-spaces': `error`,
    'no-setter-return': `error`,
    'no-sparse-arrays': `error`,
    'no-template-curly-in-string': `error`,
    'no-unexpected-multiline': `error`,
    'no-unreachable': `error`,
    'no-unsafe-finally': `error`,
    'no-unsafe-negation': [`error`, { enforceForOrderingRelations: true }],
    'no-useless-backreference': `error`,
    'require-atomic-updates': `error`,
    'use-isnan': [
      `error`,
      {
        enforceForSwitchCase: true,
        enforceForIndexOf: true
      }
    ],
    'valid-typeof': [`error`, { requireStringLiterals: false }],

    // Best practices
    'array-callback-return': [
      `error`,
      {
        allowImplicit: false,
        checkForEach: false
      }
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
        allowSwitch: false
      }
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
    'no-shadow': `error`,
    'no-shadow-restricted-names': `error`,
    'no-undef': `error`,
    'no-undef-init': `error`,
    'no-unused-vars': [
      `error`,
      {
        vars: `all`,
        args: `after-used`,
        ignoreRestSiblings: true,
        caughtErrors: `all`
      }
    ],
    'no-use-before-define': [
      `error`,
      { functions: false, classes: false, variables: false }
    ],

    // Stylistic issues
    camelcase: `error`,
    'capitalized-comments': [
      `error`,
      `always`,
      { ignoreConsecutiveComments: true }
    ],
    'consistent-this': [`error`, `self`],
    'func-names': [`error`, `never`],
    'func-style': [`error`, `declaration`, { allowArrowFunctions: true }],
    'line-comment-position': `error`,
    'lines-around-comment': [
      `error`,
      {
        beforeBlockComment: true,
        afterBlockComment: false,
        beforeLineComment: true,
        afterLineComment: false,
        allowBlockStart: true,
        allowObjectStart: true,
        allowArrayStart: true,
        allowClassStart: true
      }
    ],
    'lines-between-class-members': [
      `error`,
      `always`,
      { exceptAfterSingleLine: true }
    ],
    'multiline-comment-style': `error`,
    'new-cap': `error`,
    'no-array-constructor': `error`,
    'no-inline-comments': `error`,
    'no-lonely-if': `error`,
    'no-multi-assign': `error`,
    'no-new-object': `error`,
    'no-tabs': `error`,
    'no-underscore-dangle': `error`,
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
    'no-duplicate-imports': `error`,
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
        object: true
      },
      { enforceForRenamedProperties: false }
    ],
    'prefer-numeric-literals': `error`,
    'prefer-rest-params': `error`,
    'prefer-spread': `error`,
    'prefer-template': `error`,
    'require-yield': `error`,
    'sort-imports-es6-autofix/sort-imports-es6': `error`,
    'symbol-description': `error`,

    // Compat
    'compat/compat': `error`,

    // JSX
    'react/jsx-boolean-value': [`error`, `always`],
    'react/jsx-closing-bracket-location': [`error`, `line-aligned`],
    'react/jsx-closing-tag-location': `error`,
    'react/jsx-curly-newline': [`error`, `consistent`],
    'react/jsx-curly-spacing': `error`,
    'react/jsx-equals-spacing': `error`,
    'react/jsx-first-prop-new-line': [`error`, `multiline-multiprop`],
    'react/jsx-fragments': `error`,
    'react/jsx-handler-names': `error`,
    'react/jsx-indent': [
      `error`,
      2,
      { checkAttributes: true, indentLogicalExpressions: true }
    ],
    'react/jsx-indent-props': [`error`, 2],
    'react/jsx-key': [`error`, { checkFragmentShorthand: true }],
    'react/jsx-no-bind': `error`,
    'react/jsx-no-comment-textnodes': `error`,
    'react/jsx-no-duplicate-props': `error`,
    'react/jsx-no-script-url': `error`,
    'react/jsx-no-target-blank': `error`,
    'react/jsx-no-undef': `error`,
    'react/jsx-no-useless-fragment': `error`,
    'react/jsx-one-expression-per-line': [`error`, { allow: `literal` }],
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
        prop: `ignore`
      }
    ],

    // React
    'react/boolean-prop-naming': [`error`, { validateNested: true }],
    'react/button-has-type': `error`,
    'react/default-props-match-prop-types': `error`,
    'react/destructuring-assignment': `error`,
    'react/display-name': `error`,
    'react/forbid-foreign-prop-types': `error`,
    'react/function-component-definition': [
      `error`,
      {
        namedComponents: `arrow-function`,
        unnamedComponents: `arrow-function`
      }
    ],
    'react/no-access-state-in-setstate': `error`,
    'react/no-adjacent-inline-elements': `error`,
    'react/no-array-index-key': `error`,
    'react/no-children-prop': `error`,
    'react/no-danger': `error`,
    'react/no-danger-with-children': `error`,
    'react/no-deprecated': `error`,
    'react/no-did-mount-set-state': `error`,
    'react/no-did-update-set-state': `error`,
    'react/no-direct-mutation-state': `error`,
    'react/no-find-dom-node': `error`,
    'react/no-is-mounted': `error`,
    'react/no-redundant-should-component-update': `error`,
    'react/no-render-return-value': `error`,
    'react/no-string-refs': [`error`, { noTemplateLiterals: true }],
    'react/no-this-in-sfc': `error`,
    'react/no-typos': `error`,
    'react/no-unescaped-entities': `error`,
    'react/no-unknown-property': `error`,
    'react/no-unsafe': [`error`, { checkAliases: true }],
    'react/no-unused-prop-types': `error`,
    'react/no-unused-state': `error`,
    'react/no-will-update-set-state': `error`,
    'react/prefer-es6-class': `error`,
    'react/prefer-read-only-props': `error`,
    'react/prefer-stateless-function': `error`,
    'react/prop-types': `error`,
    'react/react-in-jsx-scope': `error`,
    'react/require-render-return': `error`,
    'react/self-closing-comp': `error`,
    'react/state-in-constructor': `error`,
    'react/void-dom-elements-no-children': `error`,

    // JSX Accessibility
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
          `video`
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
          `treegrid`
        ],
        includeRoles: [`alert`, `dialog`]
      }
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
          `textbox`
        ]
      }
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
        img: [`onError`, `onLoad`]
      }
    ],
    'jsx-a11y/no-noninteractive-element-to-interactive-role': `error`,
    'jsx-a11y/no-noninteractive-tabindex': `error`,
    'jsx-a11y/no-onchange': `error`,
    'jsx-a11y/no-redundant-roles': `error`,
    'jsx-a11y/no-static-element-interactions': `error`,
    'jsx-a11y/role-has-required-aria-props': `error`,
    'jsx-a11y/role-supports-aria-props': `error`,
    'jsx-a11y/scope': `error`,
    'jsx-a11y/tabindex-no-positive': `error`
  }
}
