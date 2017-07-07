const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ComponentDirectoryPlugin = require('component-directory-webpack-plugin')

const _dirname = path.join(__dirname, '..')
const srcPath = path.join(_dirname, 'src')
const entry = path.join(srcPath, 'index.js')
const buildPath = path.join('public')

module.exports = {
  config: {
    entry,
    output: {
      filename: 'bundle.js',
      path: _dirname,
      publicPath: '/',
      library: 'ODRI',
      libraryTarget: 'umd'
    },

    module: {
      rules: [
        {
          test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
          loader: 'file-loader?name=public/fonts/[name].[ext]'
        },
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
          use: ['sass-variable-loader']
        },
        { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ }
      ]
    },

    resolve: {
      modules: [
        _dirname,
        path.join(srcPath),
        path.join(buildPath),
        'node_modules'
      ],
      plugins: [new ComponentDirectoryPlugin()],
      extensions: ['.js', '.json', '.jsx', '.css', '.scss']
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(buildPath, 'index.html'),
        inject: false
      })
    ]
  },
  paths: {
    buildPath,
    _dirname
  }
}
