const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './src/app.jsx',
  output: {
    path: resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'js/[name]-bundle-[chunkhash:5].js'
  },
  module: {
    rules: [
      // react语法文件处理
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react']
          }
        }
      },
      // css文件处理
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      // scss文件处理
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      // 图片处理
      {
        test: /\.(png|jpg|gif)$/i,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]-[hash:5].[ext]',
            limit: 8197,
            outputPath: 'statics/imgs/'
          }
        }
      },
      // 字体图标处理
      {
        test: /\.(eot|svg|ttf|woff|woff2|otf)$/i,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]-[hash:5].[ext]',
            limit: 8197,
            outputPath: 'statics/fonts/'
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      page: resolve(__dirname, 'src/page'),
      component: resolve(__dirname, 'src/component'),
      util: resolve(__dirname, 'src/util'),
      service: resolve(__dirname, 'src/service')
    }
  },
  plugins: [
    // 处理html文件
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      minify: {
        collapseWhitespace: true
      }
    }),
    // 独立css文件
    new ExtractTextPlugin({
      filename: 'css/[name]-bundle-[chunkhash:5].css'
    }),
    // 提出公共模块
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/base-[chunkhash:5].js'
    })
  ],
  devServer: {
    port: 8081,
    overlay: true,
    historyApiFallback: {
      index: '/dist/index.html'
    },
    proxy: {
      '/manage': {
        target: 'http://admintest.happymmall.com',
        changeOrigin: true
      }
    }
  }
}
