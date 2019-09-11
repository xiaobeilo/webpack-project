const baseConfig = require('./webpack.base.config')
// const prodConfig = require('./webpack.prod.config')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')

module.exports = merge(baseConfig, {
  devtool: '#inline-cheap-module-source-map',
  // target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(sa|sc)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader',
        ]
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
        ]
      }
    ]
  }
})