import test from 'ava'
import { isNodeSupported, isBrowserSupported } from '../src/env.js'
import { fixture } from './helpers/index.mjs'

test.serial(`only node supported`, t => {
  process.chdir(fixture(`node`))

  t.true(isNodeSupported())
  t.false(isBrowserSupported())
})

test.serial(`only browser supported`, t => {
  process.chdir(fixture(`browser`))

  t.false(isNodeSupported())
  t.true(isBrowserSupported())
})

test.serial(`both node and browser supported`, t => {
  process.chdir(fixture(`isomorphic`))

  t.true(isNodeSupported())
  t.true(isBrowserSupported())
})
