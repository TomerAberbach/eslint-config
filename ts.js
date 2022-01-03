const { getEnv } = require(`./src/env.js`)

module.exports = {
  ...require(`./src/parsers/ts.js`),
  env: getEnv(),
  extends: require.resolve(`./src/configs/ts.js`),
}
