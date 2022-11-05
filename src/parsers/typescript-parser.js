const findUp = require(`find-up`)
const { dirname, join, parse } = require(`path`)
const wrapParser = require(`./wrap-parser.js`)

const hasTsconfigPaths = new Map()

module.exports = wrapParser({
  parser: require(`@typescript-eslint/parser`),
  options: { project: `tsconfig.json` },
  normalizeOptions: options => {
    let tsconfigPath
    let directoryPath = dirname(options.filePath)
    const { root } = parse(directoryPath)

    while (directoryPath !== root) {
      tsconfigPath = join(directoryPath, `tsconfig.json`)
      let hasTsconfigPath = hasTsconfigPaths.get(directoryPath)

      if (hasTsconfigPath === undefined) {
        hasTsconfigPaths.set(
          directoryPath,
          (hasTsconfigPath = findUp.sync.exists(tsconfigPath)),
        )
      }

      if (hasTsconfigPath) {
        break
      }

      directoryPath = dirname(directoryPath)
    }

    if (tsconfigPath) {
      options = { ...options, project: tsconfigPath }
    }

    return options
  },
})
