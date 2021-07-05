import test from 'ava'
import { ESLint } from 'eslint'
import { fixture } from './helpers/index.mjs'

test.serial(`only node supported config`, async t => {
  process.chdir(fixture(`node`))
  const eslint = new ESLint()

  const config = await eslint.calculateConfigForFile(fixture(`node/index.js`))

  t.true(config.env.node)
  t.false(config.plugins.includes(`compat`))
})

test.serial(`only browser supported config`, async t => {
  process.chdir(fixture(`browser`))
  const eslint = new ESLint()

  const config = await eslint.calculateConfigForFile(
    fixture(`browser/index.js`),
  )
  t.log(config)

  t.false(config.plugins.includes(`node`))
  t.true(config.plugins.includes(`compat`))
})

test.serial(`both node and browser supported`, async t => {
  process.chdir(fixture(`isomorphic`))
  const eslint = new ESLint()

  const config = await eslint.calculateConfigForFile(
    fixture(`isomorphic/index.js`),
  )
  t.log(config)

  t.true(config.env[`shared-node-browser`])
  t.true(config.plugins.includes(`compat`))
})
