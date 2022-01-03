const { isBrowserSupported } = require(`../env.js`)

module.exports = isBrowserSupported()
  ? {
      plugins: [`compat`],
      rules: {
        'compat/compat': `error`,
      },
    }
  : {}
