const { getEnv } = require(`./src/env.js`)

module.exports = {
  ...require(`./src/parsers/js.js`),
  env: getEnv(),
  settings: require(`./src/settings/jsx.js`),
  extends: [
    require.resolve(`./src/configs/js.js`),
    require.resolve(`./src/configs/jsx.js`),
  ],
}
