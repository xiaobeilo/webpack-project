const webpack = require('webpack')
const path = require('path')

module.exports = {
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client?reload=true'
  ],
  output: {
    filename: '[name].js',
    chunkFilename: 'chunk-[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        include: [path.resolve(__dirname, '../src')],
        enforce: 'pre',
        use: [
          {
            loader: 'eslint-loader',
            options: {
              formatter: require('eslint-friendly-formatter'),
              emitWarning: false,
              failOnError: false,
            }
          }
        ],
      },
      {
        test: /\.(sa|sc)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        chunkModules: {
          chunks: 'initial',
          test: /[\\/]node_modules[\\/]/,
          name: 'chunk-modules'
        }
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  stats: 'errors-only'
}