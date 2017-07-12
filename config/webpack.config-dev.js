const webpack = require('webpack')
const express = require('express')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const baseConfig = require('./webpack.config-base')
const { config, paths } = baseConfig
const { buildPath } = paths

module.exports = Object.assign(config, {
  devtool: 'source-map',

  module: Object.assign(config.module, {
    rules: config.module.rules.concat([
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: 'true',
              importLoaders: 2,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          'postcss-loader',
          'sass-loader'
        ],
        exclude: /variables\.scss$/
      }
    ])
  }),

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(buildPath, 'index.html'),
      inject: false
    }),
    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    hot: true,
    contentBase: buildPath,
    publicPath: '/',
    setup (app) {
      app.use(
        '/public',
        express.static(path.resolve(buildPath), { index: false })
      )
    }
  }
})
