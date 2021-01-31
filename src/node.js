const { isNodeSupported } = require(`./environment.js`)

module.exports = isNodeSupported()
  ? {
      plugins: [`node`],
      rules: {
        'node/no-exports-assign': `error`,
        'node/no-new-require': `error`,
        'node/no-path-concat': `error`,
        'node/no-process-exit': `error`,
        'node/no-unpublished-bin': `error`,
        'node/no-unpublished-import': `error`,
        'node/no-unpublished-require': `error`,
        'node/no-unsupported-features/es-builtins': `error`,
        'node/no-unsupported-features/es-syntax': [
          `error`,
          {
            // Remove when https://github.com/mysticatea/eslint-plugin-node/issues/250 is resolved
            ignores: [`modules`, `dynamicImport`]
          }
        ],
        'node/no-unsupported-features/node-builtins': `error`,
        'node/shebang': `error`,

        'node/no-deprecated-api': `error`,

        'node/exports-style': [`error`, `module.exports`],
        'node/file-extension-in-import': [`error`, `always`]
      }
    }
  : {}
