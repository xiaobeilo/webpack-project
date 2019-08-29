const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, '../src/main.ts'),
  // entry: path.resolve(__dirname, '../src/main.js'),
  output: {
    path: path.resolve(__dirname, `../dist`),
    filename: 'bundle.js',
    chunkFilename: '[name].[id].[chunkhash].js',
  },
  resolve: {
    extensions: ['*', '.js', 'jsx', 'ts', '.vue', '.json'],
    alias: {
      '@': path.join(__dirname, '../src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, '../src')
        ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: "ts-loader",
            options: {
              transpileOnly: false,
              appendTsxSuffixTo: [/\.vue$/]
            }
          }
        ]
      },
      // {
      //   test: /\.html$/,
      //   use: [{
      //     loader: 'html-loader',
      //     options: {
      //       root: path.resolve(__dirname, '../src'),
      //       attrs: ['img:src', 'link:href']
      //     }
      //   }]
      // },
      // {
      //   test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
      //   exclude: /favicon\.png$/,
      //   use: [{
      //     loader: 'url-loader',
      //     options: {
      //       limit: 1000,
      //       name: 'assets/img/[name].[hash:12].[ext]'
      //     }
      //   }]
      // }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.html'),
      inject: true,
      // favicon: './src/assets/images/lefit-new.ico',
      hash: false,
      // chunks: [name],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    })
  ],
  performance: {
    hints: false
  }
}
