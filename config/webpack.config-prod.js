const webpack = require('webpack')
const path = require('path')

const baseConfig = require('./webpack.config-base')
const { config, paths } = baseConfig
const { buildPath } = paths

module.exports = Object.assign(config, {

  output: Object.assign(config.output, {
    filename: path.join(buildPath, 'bundle.js')
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
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
})
