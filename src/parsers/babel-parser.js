const { join } = require(`path`)
const wrapParser = require(`./wrap-parser.js`)

module.exports = wrapParser({
  parser: require(`@babel/eslint-parser`),
  options: {
    requireConfigFile: false,
    babelOptions: { configFile: join(__dirname, `babel.config.json`) },
  },
  normalizeOptions: ({ sourceType, ...rest }) => ({
    sourceType: `module`,
    ...rest,
  }),
})
