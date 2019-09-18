const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('../config/webpack.base.config')
const prodConfig = require('../config/webpack.prod.config')
const env = process.argv[2] || 'prod'
const output = merge(baseConfig, prodConfig, {
  plugins: [
    new webpack.DefinePlugin(
      require('../env')(env)
    )
  ]
})

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