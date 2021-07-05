const { isBrowserSupported } = require(`./environment.js`)

module.exports = isBrowserSupported()
  ? {
      plugins: [`compat`],
      rules: {
        'compat/compat': `error`,
      },
    }
  : {}
