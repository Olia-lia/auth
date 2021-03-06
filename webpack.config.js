const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");

//uglify, postcss, optimization


const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const babelOptions = preset => {
  const opts = {
    presets: [
      '@babel/preset-env'
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties'
    ]
  } 
   if (preset) {
    opts.presets.push(preset)
  }

  return opts
};

const jsLoaders = () => {
  const loaders = [{
    loader: 'babel-loader',
    options: babelOptions()
  }]

  if (isDev) {
    loaders.push('eslint-loader')
  }

  return loaders
};


const cssLoaders = extra => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev,
        reloadAll: true
      },
    },
    'css-loader'
  ]

  if (extra) {
    loaders.push(extra)
  }

  return loaders
};


module.exports = {
    entry: './client/index.js',
    mode: isDev,
    devtool: 'source-map-loader',

  
      output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
  
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
          exclude: [/node_modules/],
         // include: [/node_modules\/auth-flow/],
          use: [ 
            {
              loader: 'babel-loader',
              options: {
                "presets":['@babel/preset-env']
              }
            },
          //   {
          //     loader: 'ts-loader'
          //   }
          ]
        },
        
        { 
          test: /s[ac]ss$/, 
          use: [
            MiniCssExtractPlugin.loader,
            
            // {
            //   loader: 'css-loader?url=false',
            //   options: {
            //     sourceMap: true,
            //     importLoaders: 1,
            //     modules: true,
                //localIdentName: "z[hash:base64]"
              
              //}
            //},
            
            // {
            //   loader: 'postcss-loader',
             
        
            // },
            {
            loader: 'css-loader',
            options: {
              url: false,
            }
            },
        
            
            'sass-loader',
          ],
         // include: /\.module\.css$/,
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
          exclude: /\.module\.css$/,
        },
        {
          test: /\.(woff|woff2)$/,
          type: 'asset/resource',
          use: ['file-loader'],
        },
  
        {
          test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
          type: 'asset/resource',
          use: ['file-loader'],
        },
      ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({

          template: 'client/index.html',
        }),

        // new CopyPlugin({
        //   patterns: [
        //   {
        //   from: path.resolve(__dirname, './client/img'),
        //   to: path.resolve(__dirname, './client/build/img')
        //   },
        //   ]
        // }),
        new MiniCssExtractPlugin({
          filename: filename('css'),
        }),
    ]
}