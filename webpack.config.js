const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
    entry: './client/front.js',
    mode: "development",
  
      output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
      },

      plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
          template: './index.html',
    }),]
}