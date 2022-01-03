const readPkgUp = require(`read-pkg-up`)
const browserslist = require(`browserslist`)

function getEnv() {
  return {
    ...getBaseEnv(),
    es2017: true,
    es2020: true,
    es2021: true,
    worker: true,
    serviceworker: true,
    webextensions: true,
  }
}

function getBaseEnv() {
  const isNode = isNodeSupported()
  const isBrowser = isBrowserSupported()

  if (isNode && isBrowser) {
    return {
      'shared-node-browser': true,
    }
  }

  if (isNode) {
    return { node: true }
  }

  if (isBrowser) {
    return { browser: true }
  }

  return {}
}

function isNodeSupported() {
  const { packageJson = {} } = readPkgUp.sync() || {}
  const { engines = {} } = packageJson

  return Boolean(engines.node)
}

function isBrowserSupported() {
  return Boolean(browserslist.findConfig(process.cwd()))
}

module.exports = {
  getEnv,
  isNodeSupported,
  isBrowserSupported,
}
