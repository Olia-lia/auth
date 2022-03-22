const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './client/index.js',
    mode: "development",
  
      output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
      },
    
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
        normalize_css: __dirname + '/node_modules/normalize.css/normalize.css',
        },
        fallback: { "path": false },
      },

      devtool: 'inline-source-map',

      devServer: {
        port: 4200,
        open: true,
      },
    
    module: {
      rules: [
        {
          test: /\.(ts|tsx|jsx|js)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        { 
          test: /\.css$/, 
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader'
          ] 
        },
      ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({

          template: 'client/index.html',
        }),
        new MiniCssExtractPlugin({
          filename: "[name].css",
        }),
    ]
}