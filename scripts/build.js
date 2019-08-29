const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('../config/webpack.base.config')
const prodConfig = require('../config/webpack.prod.config')

// config 配置修改 结束

var output = merge(baseConfig, prodConfig)

webpack(output, (err, stats) => {
  if (err) {
    if (err.details) {
      throw err.details
    }
    throw err.stack || err
  }
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  const info = stats.toJson()


  if (stats.hasErrors()) {
    process.exit(1)
    throw JSON.stringify(info.errors)
  }

  if (stats.hasWarnings()) {
    // throw info.warnings
  }
})