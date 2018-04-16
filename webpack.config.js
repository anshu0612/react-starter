const HtmlWebPackPlugin = require('html-webpack-plugin')

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html'
})

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  devServer: {
    compress: true,
    port: 9000,
    host: '0.0.0.0'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [htmlPlugin]
}
