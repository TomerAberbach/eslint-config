module.exports = {
  parser: require.resolve(`@typescript-eslint/parser`),
  parserOptions: {
    project: `tsconfig.json`
  },
  plugins: [`@typescript-eslint`],
  extends: `./index.js`,
  rules: Object.fromEntries(
    Object.entries({
      'adjacent-overload-signatures': `error`,
      'array-type': `error`,
      'await-thenable': `error`,
      'ban-ts-comment': `error`,
      'ban-types': `error`,
      'class-literal-property-style': `error`,
      'consistent-indexed-object-style': `error`,
      'consistent-type-assertions': `error`,
      'consistent-type-definitions': `error`,
      'consistent-type-imports': `error`,
      'explicit-function-return-type': `error`,
      'explicit-member-accessibility': `error`,
      'explicit-module-boundary-types': `error`,
      'member-delimiter-style': [
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
      'method-signature-style': `error`,
      'no-confusing-non-null-assertion': `error`,
      'no-confusing-void-expression': [
        `error`,
        {
          ignoreArrowShorthand: true,
          ignoreVoidOperator: true
        }
      ],
      'no-empty-interface': `error`,
      'no-explicit-any': `error`,
      'no-extra-non-null-assertion': `error`,
      'no-extraneous-class': `error`,
      'no-floating-promises': `error`,
      'no-implicit-any-catch': `error`,
      'no-inferrable-types': `error`,
      'no-invalid-void-type': `error`,
      'no-misused-new': `error`,
      'no-misused-promises': `error`,
      'no-namespace': `error`,
      'no-non-null-asserted-optional-chain': `error`,
      'no-parameter-properties': `error`,
      'no-require-imports': `error`,
      'no-this-alias': `error`,
      'no-unnecessary-boolean-literal-compare': `error`,
      'no-unnecessary-condition': `error`,
      'no-unnecessary-qualifier': `error`,
      'no-unnecessary-type-arguments': `error`,
      'no-unnecessary-type-assertion': `error`,
      'no-unnecessary-type-constraint': `error`,
      'no-unsafe-assignment': `error`,
      'no-unsafe-call': `error`,
      'no-unsafe-member-access': `error`,
      'no-unsafe-return': `error`,
      'non-nullable-type-assertion-style': `error`,
      'prefer-as-const': `error`,
      'prefer-function-type': `error`,
      'prefer-includes': `error`,
      'prefer-namespace-keyword': `error`,
      'prefer-nullish-coalescing': `error`,
      'prefer-optional-chain': `error`,
      'prefer-readonly': `error`,
      'prefer-readonly-parameter-types': `error`,
      'prefer-reduce-type-parameter': `error`,
      'prefer-regexp-exec': `error`,
      'prefer-string-starts-ends-with': `error`,
      'prefer-ts-expect-error': `error`,
      'restrict-plus-operands': [
        `error`,
        {
          checkCompoundAssignments: true
        }
      ],
      'switch-exhaustiveness-check': `error`,
      'triple-slash-reference': [
        `error`,
        {
          path: `never`,
          types: `never`,
          lib: `never`
        }
      ],
      'type-annotation-spacing': `error`,
      'unbound-method': `error`,
      'unified-signatures': `error`
    }).map(([key, value]) => [`@typescript-eslint/${key}`, value])
  )
}
