const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './index.js',
  devServer: {
    hot: true,
    publicPath: '',
    proxy: {
      '/api': 'http://localhost:3000',
    },
    historyApiFallback: true,
    contentBase: path.join(__dirname, './')
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      }
    }]
  },
  output: {
    path: path.resolve(__dirname),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};