module.exports = {
  parser: require.resolve(`@babel/eslint-parser`),
  parserOptions: {
    ecmaVersion: `latest`,
    sourceType: `module`,
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true,
    },
    requireConfigFile: false,
    babelOptions: {
      configFile: require.resolve(`./babel.config.json`),
    },
  },
}
