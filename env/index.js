const path = require('path')
const dotenv = require('dotenv')

module.exports = env => {
  let envConfig = dotenv.config({
    path: path.resolve(__dirname, `./${env}.env`)
  })
  envConfig = envConfig.parsed
  for (let key in envConfig) {
    envConfig[key] = JSON.stringify(envConfig[key])
  }
  return envConfig
}