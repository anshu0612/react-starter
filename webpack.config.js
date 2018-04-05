const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

// def
const pathBuild = (...paths) => path.join(__dirname, '..', 'dist', ...paths)
const pathSrc = (...paths) => path.join(__dirname, '..', 'src', ...paths)
const cssModuleScopedName = '[path]_[name]_[local]'
const jsEntry = pathSrc('index.jsx')

// init config
const config = {
  context: pathSrc(),
  entry: ['react-hot-loader/patch', jsEntry],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules'],
    alias: { 'APP': pathSrc() }
  },
  module: {rules: []},
  plugins: []
}

// ----------------------------------------------------------
// output
config.output = {
  path: pathBuild(),
  filename: 'assets/js/[name].js',
  sourceMapFilename: 'assets/js/[name].map',
  // Remove this if the application supposed to
  // be deploy to a non-root location in your server
  publicPath: '/'
}

// ----------------------------------------------------------
// dev server
config.devServer = {
  port: 3000,
  host: '0.0.0.0',
  compress: true,
  historyApiFallback: true
}

config.devtool = 'cheap-module-eval-source-map'

// ----------------------------------------------------------
// rules

// validate JS coding standard
config.module.rules.push({
  enforce: 'pre',
  test: /\.jsx?$/,
  use: ['standard-loader']
})

// handle js/jsx
config.module.rules.push({
  test: /\.jsx?$/,
  use: ['babel-loader']
})

// add rule to support images & fonts
config.module.rules.push({
  test: /\.(png|gif|jpe?g|svg|woff|woff2|ttf|eot)$/,
  loader: 'file-loader',
  options: {name: '[path]/[name].[ext]'}
})

// add rule to support css
config.module.rules.push({
  test: /\.css$/,
  use: [
    'style-loader',
    `css-loader?importLoader=1&modules&localIdentName=${cssModuleScopedName}`
  ]
})

// ----------------------------------------------------------
// plugins
// show named module of hot reload
config.plugins.push(new webpack.NamedModulesPlugin())

// copy HTML entry file
config.plugins.push(new HtmlWebpackPlugin({
  filename: pathBuild('index.html'),
  template: pathSrc('index.html'),
  htmlVersion: 'DEV'
}))

// define env
config.plugins.push(new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': '"dev"'
  }
}))

// copy public folder
config.plugins.push(new CopyWebpackPlugin([{
  from: pathSrc('..', 'public'),
  to: pathBuild('public')
}]))

module.exports = config
