const webpack = require('webpack')
const baseConfig = require('../config/webpack.base.config')
const devConfig = require('../config/webpack.dev.config')
const webpackDevMiddleware = require('webpack-dev-middleware')
const merge = require('webpack-merge')
const express = require('express')
const proxy = require('http-proxy-middleware')
const timeout = require('connect-timeout')
const webpackHotMiddleware = require('webpack-hot-middleware')
const threadLoader = require('thread-loader')
const DashboardPlugin = require("webpack-dashboard/plugin");
const env = process.argv[2] || 'dev'

threadLoader.warmup({
  // pool options, like passed to loader options
  // must match loader options to boot the correct pool
}, [
  // modules to load
  // can be any module, i. e.
  'babel-loader',
  'ts-loader',
  'vue-loader',
])

function createServer (webpackConfig) {
  const compiler = webpack(webpackConfig)

  compiler.apply(new DashboardPlugin())

  const app = express()
  app.use(webpackDevMiddleware(compiler, {
    publicPath: '/'
  }))
  app.use(timeout(5000))
  app.use('/api', proxy({
    target: 'https://biaochenxuying.cn',
    changeOrigin: true
  }))
  app.use(webpackHotMiddleware(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
  }));
  app.listen(3000, () => console.log('Example app listening on port 3000!'))
}

const output = merge(baseConfig, devConfig, {
  plugins: [
    new webpack.DefinePlugin(
      require('../env')(env)
    )
  ]
})

createServer(output)