const environment = require(`./src/environment.js`)

const getEnv = () => {
  const isNodeSupported = environment.isNodeSupported()
  const isBrowserSupported = environment.isBrowserSupported()

  if (isNodeSupported && isBrowserSupported) {
    return {
      'shared-node-browser': true,
    }
  }

  if (isNodeSupported) {
    return { node: true }
  }

  if (isBrowserSupported) {
    return { browser: true }
  }

  return {}
}

module.exports = {
  parserOptions: {
    ecmaVersion: `latest`,
    sourceType: `module`,
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true,
    },
  },
  env: {
    ...getEnv(),
    es2017: true,
    es2020: true,
    es2021: true,
    worker: true,
    serviceworker: true,
    webextensions: true,
  },
  plugins: [`import`],
  extends: [`./src/browser.js`],
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
        allowClassStart: true,
      },
    ],
    'lines-between-class-members': [
      `error`,
      `always`,
      { exceptAfterSingleLine: true },
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
    'import/order': `error`,
    'import/newline-after-import': `error`,
  },
}
