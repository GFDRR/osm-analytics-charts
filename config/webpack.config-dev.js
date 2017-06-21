const webpack = require('webpack')

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
    publicPath: '/'
  }
})
