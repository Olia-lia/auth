const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");

//uglify, postcss, optimization

const babelOptions = preset => {
  const opts = {
    presets: [
      '@babel/preset-env'
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties'
    ]
  }
}

module.exports = {
    entry: './client/index.js',
    mode: 'development',
    devtool: 'source-map',
  
      output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
      },
    
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.woff2'],
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
            //options: babelOptions('@babel/preset-typescript')
          },
        },
        { 
          test: /s[ac]ss$/, 
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader?url=false',
        
            {
              loader: 'css-loader?url=false',
              options: {
                sourceMap: true,
                importLoaders: 1,
                modules: true,
                //localIdentName: "z[hash:base64]"
              
              }
            },
            
            // {
            //   loader: 'postcss-loader',
            //   options: {
            //     plugins: () => [
            //       require("autoprefixer")()
            //     ],
            //   },
            // // },
            
            'sass-loader',
          ],
         // include: /\.module\.css$/,
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
          exclude: /\.module\.css$/,
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