const readPkgUp = require(`read-pkg-up`)
const browserslist = require(`browserslist`)

module.exports.isNodeSupported = () => {
  const { packageJson = {} } = readPkgUp.sync() || {}
  const { engines = {} } = packageJson

  return Boolean(engines.node)
}

module.exports.isBrowserSupported = () =>
  Boolean(browserslist.findConfig(process.cwd()))
