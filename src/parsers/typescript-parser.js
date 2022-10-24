const wrapParser = require(`./wrap-parser.js`)

module.exports = wrapParser({
  parser: require(`@typescript-eslint/parser`),
  options: { project: `tsconfig.json` },
})
