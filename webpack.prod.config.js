const dotenv = require('dotenv');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { DefinePlugin } = require('webpack');

module.exports = () => {  
  const entry = path.resolve(__dirname, './src/index.js'),
        home = path.resolve(__dirname, './dist'),
        exclude = [
          path.resolve( __dirname, './dist' ),
          path.resolve( __dirname, 'node_modules' ),
          home
        ],
        output = {
          clean: {
            keep: /tinymce|index.html/
          },
          filename: 'bundle.js',
          path: home
        },
        env = dotenv.config().parsed, // call dotenv and it will return an Object with a parsed key
        envKeys = Object.keys( env ).reduce(( prev, next ) => {
          prev[ `process.env.${ next }` ] = JSON.stringify( env[ next]);
          return prev;
        }, {}), // reduce it to a nice object, the same as before
        resolve = {
          modules: [
            __dirname,
            path.resolve( __dirname, 'node_modules' )
          ]
        }

  return {
    entry,

    devtool: 'source-map',
    mode: 'production',

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude,
          use: [ 'babel-loader' ]
        },
        {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
        }
      ]
    },

    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          minify: TerserPlugin.uglifyJsMinify
        }),
      ],
      /*runtimeChunk: 'single',
       splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
        chunks: 'all',
        maxSize: 240000
      } */
    },

    output,

    plugins: [
      new DefinePlugin( envKeys ),
      // new HtmlWebpackPlugin({
      //   template: 'assets/index.html'
      // })
    ],
    resolve
  }
};