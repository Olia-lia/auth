const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
    entry: './client/main.js',
    mode: "development",
  
      output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
      },


    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
      ]
    },
     plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({

          template: '.client/index.html',
    }),]
}