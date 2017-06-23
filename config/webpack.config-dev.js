const webpack = require('webpack')
const express = require('express')
const path = require('path')

const baseConfig = require('./webpack.config-base')
const { config, paths } = baseConfig
const { buildPath } = paths

module.exports = Object.assign(config, {
  devtool: 'source-map',

  plugins: config.plugins.concat([
    new webpack.HotModuleReplacementPlugin()
  ]),

  devServer: {
    hot: true,
    contentBase: buildPath,
    publicPath: '/',
    setup (app) {
      app.use('/public', express.static(path.resolve(buildPath), { index: false }))
      // app.use('/public/*', express.static(buildPath, { index: false }))
      // app.use('/fonts', express.static(path.join(buildPath, 'fonts')))
    }
  }
})
