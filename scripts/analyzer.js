const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('../config/webpack.base.config')
const devConfig = require('../config/webpack.dev.config')
const prodConfig = require('../config/webpack.prod.config')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path')
const pkg = require('../package.json')

let arg = process.argv[2]

// config 配置修改 结束

var output = merge(baseConfig, arg === 'dev' ? devConfig : prodConfig, {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      generateStatsFile: true,
      reportFilename: path.join(__dirname, '../analyzer') + (arg === 'dev' ? '/report-dev' : '/report') + `-${pkg.version}.html`
    })
  ]
})
console.log(pkg)

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