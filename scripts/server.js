const webpack = require('webpack')
const baseConfig = require('../config/webpack.base.config')
const devConfig = require('../config/webpack.dev.config')
const webpackDevMiddleware = require('webpack-dev-middleware')
const merge = require('webpack-merge')
const express = require('express')
const httpPrpxy = require('http-proxy-middleware')

const proxyMiddleware = async (ctx, next) => {
  var options = {
    target: 'http://www.example.org', // target host
    changeOrigin: true, // needed for virtual hosted sites
    ws: true, // proxy websockets
    pathRewrite: {
      '^/api/old-path': '/api/new-path', // rewrite path
      '^/api/remove/path': '/path' // remove base path
    },
    router: {
      // when request.headers.host == 'dev.localhost:3000',
      // override target 'http://www.example.org' to 'http://localhost:8000'
      'dev.localhost:3000': 'http://localhost:8000'
    }
  }
  return httpPrpxy(options)
}


function createServer (webpackConfig) {
  const compiler = webpack(webpackConfig)
  const app = express()
  app.use(webpackDevMiddleware(compiler, {
    publicPath: '/'
  }))
  app.use(proxyMiddleware)
  app.listen(3000, () => console.log('Example app listening on port 3000!'))
}

const output = merge(baseConfig, devConfig)

createServer(output)