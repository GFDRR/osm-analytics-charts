const webpack = require('webpack')
const path = require('path')
const difference = require('lodash/difference')
const drop = require('lodash/drop')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const baseConfig = require('./webpack.config-base')
const { config, paths } = baseConfig
const { buildPath } = paths

const { rules } = config.module
const restRules = rules.filter(rule => `${rule.test}` !== '/\\.scss$/')
const cssRules = difference(rules, restRules)

module.exports = Object.assign(config, {
  output: Object.assign(config.output, {
    filename: path.join(buildPath, 'bundle.js')
  }),

  module: Object.assign(config.module, {
    rules: restRules.concat([
      Object.assign(cssRules[0], {
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: drop(cssRules[0].use, 1)
        })
      })
    ])
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
