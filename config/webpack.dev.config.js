module.exports = {
  mode: 'development',
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
}