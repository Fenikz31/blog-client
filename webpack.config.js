const path = require('path');
const { DefinePlugin, HotModuleReplacementPlugin } = require('webpack');
const dotenv = require('dotenv');

module.exports = () => {  
  const entry = path.resolve(__dirname, './src/index.js'),
        home = path.resolve(__dirname, './dist'),
        exclude = [
          path.resolve( __dirname, './dist' ),
          path.resolve( __dirname, 'node_modules' ),
          home
        ],
        output = {
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

    devServer: {
      client: {
        logging: 'verbose',
        progress: true
      },
      compress: true,
      historyApiFallback: true,
      host: '0.0.0.0',
      port: 5001,
      static: home
    },

    devtool: 'source-map',
    mode: 'development',

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

    output,

    plugins: [
      new DefinePlugin( envKeys )
    ],
    resolve
  }
};