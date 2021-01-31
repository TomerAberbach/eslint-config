module.exports = {
  parser: require.resolve(`@typescript-eslint/parser`),
  parserOptions: {
    project: `tsconfig.json`
  },
  plugins: [`@typescript-eslint`],
  extends: `./index.js`,
  rules: {
    '@typescript-eslint/adjacent-overload-signatures': `error`,
    '@typescript-eslint/array-type': `error`,
    '@typescript-eslint/await-thenable': `error`,
    '@typescript-eslint/ban-ts-comment': `error`,
    '@typescript-eslint/ban-types': `error`,
    '@typescript-eslint/class-literal-property-style': `error`,
    '@typescript-eslint/consistent-indexed-object-style': `error`,
    '@typescript-eslint/consistent-type-assertions': `error`,
    '@typescript-eslint/consistent-type-definitions': `error`,
    '@typescript-eslint/consistent-type-imports': `error`,
    '@typescript-eslint/explicit-function-return-type': `error`,
    '@typescript-eslint/explicit-member-accessibility': `error`,
    '@typescript-eslint/explicit-module-boundary-types': `error`,
    '@typescript-eslint/member-delimiter-style': [
      `error`,
      {
        multiline: {
          delimiter: `none`
        },
        singleline: {
          delimiter: `comma`,
          requireLast: false
        }
      }
    ],
    '@typescript-eslint/method-signature-style': `error`,
    '@typescript-eslint/no-confusing-non-null-assertion': `error`,
    '@typescript-eslint/no-confusing-void-expression': [
      `error`,
      {
        ignoreArrowShorthand: true,
        ignoreVoidOperator: true
      }
    ],
    '@typescript-eslint/no-empty-interface': `error`,
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
    '@typescript-eslint/prefer-readonly-parameter-types': `error`,
    '@typescript-eslint/prefer-reduce-type-parameter': `error`,
    '@typescript-eslint/prefer-regexp-exec': `error`,
    '@typescript-eslint/prefer-string-starts-ends-with': `error`,
    '@typescript-eslint/prefer-ts-expect-error': `error`,
    '@typescript-eslint/restrict-plus-operands': [
      `error`,
      {
        checkCompoundAssignments: true
      }
    ],
    '@typescript-eslint/switch-exhaustiveness-check': `error`,
    '@typescript-eslint/triple-slash-reference': [
      `error`,
      {
        path: `never`,
        types: `never`,
        lib: `never`
      }
    ],
    '@typescript-eslint/type-annotation-spacing': `error`,
    '@typescript-eslint/unbound-method': `error`,
    '@typescript-eslint/unified-signatures': `error`
  }
}
