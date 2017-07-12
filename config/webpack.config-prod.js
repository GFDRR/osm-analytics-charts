const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const baseConfig = require('./webpack.config-base')
const { config, paths } = baseConfig
const { buildPath } = paths

module.exports = Object.assign(config, {
  output: Object.assign(config.output, {
    filename: path.join(buildPath, 'bundle.js')
  }),

  module: Object.assign(config.module, {
    rules: config.module.rules.concat([
      {
        test: /\.scss$/,
        exclude: /variables\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
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
          ]
        })
      }
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
