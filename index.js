const { getEnv } = require(`./src/env.js`)

module.exports = {
  ...require(`./src/parsers/js.js`),
  env: getEnv(),
  extends: require.resolve(`./src/configs/js.js`),
}
