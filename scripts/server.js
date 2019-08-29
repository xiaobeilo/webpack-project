const webpack = require('webpack')
const baseConfig = require('../config/webpack.base.config')
const devConfig = require('../config/webpack.dev.config')
const webpackDevMiddleware = require('webpack-dev-middleware')
const merge = require('webpack-merge')
const express = require('express')
const proxy = require('http-proxy-middleware')
const timeout = require('connect-timeout')

function createServer (webpackConfig) {
  const compiler = webpack(webpackConfig)
  const app = express()
  app.use(webpackDevMiddleware(compiler, {
    publicPath: '/'
  }))
  app.use(timeout(5000))
  app.use('/api', proxy({
    target: 'https://biaochenxuying.cn',
    changeOrigin: true
  }))
  app.listen(3000, () => console.log('Example app listening on port 3000!'))
}

const output = merge(baseConfig, devConfig)

createServer(output)