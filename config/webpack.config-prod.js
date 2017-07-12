const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const baseConfig = require('./webpack.config-base')
const { config, paths, sassRules } = baseConfig
const { buildPath } = paths

const { rules } = config.module

module.exports = Object.assign(config, {
  output: Object.assign(config.output, {
    filename: path.join(buildPath, 'bundle.js')
  }),

  module: Object.assign(config.module, {
    rules: Object.assign(rules, {
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: sassRules.use
      })
    })
  }),

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      comments: false,
      sourceMap: false,
      mangle: true,
      minimize: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin('public/styles.css')
  ]
})
