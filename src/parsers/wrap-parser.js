const wrapParse =
  (parse, normalizeOptions, parserOptions) =>
  (code, options = {}) =>
    parse(code, { ...parserOptions, ...normalizeOptions(options) })

module.exports = ({
  parser: { parse, parseForESLint },
  options,
  normalizeOptions = options => options,
}) => ({
  parse: wrapParse(parse, normalizeOptions, options),
  parseForESLint: wrapParse(parseForESLint, normalizeOptions, options),
})
