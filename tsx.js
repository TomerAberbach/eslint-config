const { getEnv } = require(`./src/env.js`)

module.exports = {
  ...require(`./src/parsers/ts.js`),
  env: getEnv(),
  settings: require(`./src/settings/jsx.js`),
  extends: [
    require.resolve(`./src/configs/ts.js`),
    require.resolve(`./src/configs/jsx.js`),
  ],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': `off`,
    '@typescript-eslint/explicit-function-return-type': `off`,
    '@typescript-eslint/no-throw-literal': `off`,
  },
}
