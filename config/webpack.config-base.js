const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ComponentDirectoryPlugin = require('component-directory-webpack-plugin')

const pck = require('../package.json')
const _dirname = path.join(__dirname, '..')
const srcPath = path.join(_dirname, 'src')
const entry = path.join(srcPath, 'index.js')
const buildPath = path.join('public')

module.exports = {
  config: {
    entry,
    output: {
      filename: path.join(buildPath, 'bundle.js'),
      path: _dirname,
      publicPath: '/',
      library: 'ODRI',
      libraryTarget: 'umd'
    },

    module: {
      rules: [
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
        },
        {
          test: /variables\.scss$/,
          use: [
            'sass-variable-loader'
          ]
        },
        { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ }
      ]
    },

    resolve: {
      modules: ['node_modules', path.join(srcPath), path.join(buildPath)],
      plugins: [new ComponentDirectoryPlugin()],
      extensions: ['.js', '.json', '.jsx', '.css', '.scss']
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(buildPath, 'index.html'),
        title: pck.name
      })
    ]
  },
  paths: {
    buildPath
  }
}
