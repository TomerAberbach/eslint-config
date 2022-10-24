const wrapParser = require(`./wrap-parser.js`)

module.exports = wrapParser({
  parser: require(`./babel-parser.js`),
  options: { ecmaFeatures: { jsx: true } },
})
