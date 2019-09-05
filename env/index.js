const uat = require('./uat')
const prod = require('./prod')
const dev = require('./dev')
const local = require('./local')
const sit = require('./sit')

module.exports = {
  uat,
  prod,
  dev,
  local,
  sit
}
