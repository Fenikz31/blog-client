const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { DefinePlugin } = require('webpack');

module.exports = () => {  
  const entry = path.resolve(__dirname, './src/index.js'),
        home = path.resolve(__dirname, './dist'),
        public_path = '../assets/',
        exclude = [
          path.resolve( __dirname, './dist' ),
          path.resolve( __dirname, 'node_modules' ),
          home
        ],
        output = {
          clean: {
            keep( asset ) {
              return asset.includes( 'assets' )
            }
          },
          filename: 'bundle.js',
          path: home,
          publicPath: public_path
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
        },
        common = {
          entry,
      
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
          },
      
          output,
      
          plugins: [
            new DefinePlugin( envKeys )
          ],
          resolve
        },
        development = {
          ...common,
      
          devServer: {
            client: {
              logging: 'verbose',
              overlay: false,
              progress: false
            },
            compress: true,
            historyApiFallback: true,
            host: '0.0.0.0',
            hot: true,
            port: 5001,
            static: home
          },
      
          devtool: 'inline-source-map',
          plugins: [
            ...commons.plugins,
            new HtmlWebpackPlugin({
              template: 'assets/index.html'
            })
          ],
          mode: 'development'
        },
        local = {
          ...common,
      
          devServer: {
            client: {
              logging: 'verbose',
              progress: true
            },
            compress: true,
            historyApiFallback: true,
            host: '0.0.0.0',
            hot: true,
            port: 5001,
            static: home
          },
      
          devtool: 'source-map',
          mode: 'development',
          plugins: [
            ...commons.plugins,
            new HtmlWebpackPlugin({
              template: 'assets/index.html'
            })
          ]
        },
        production = {
          ...common,

          devtool: 'source-map',
      
          mode: 'production',
        },
        test = {
          ...common,
      
          devServer: {
            client: {
              logging: 'error',
              progress: true
            },
            compress: true,
            historyApiFallback: true,
            host: '0.0.0.0',
            port: 5001,
            static: home
          },
      
          mode: 'production',
          plugins: [
            ...commons.plugins,
            new HtmlWebpackPlugin({
              template: 'assets/index.html'
            })
          ]
        }

  if ( process.env.NODE_ENV ) {
    switch ( process.env.NODE_ENV ) {
      case 'development':
        return development

      case 'local':
        return local

      case 'production':
        return production

      case 'test':
        return test
        
      default:
        return production
    }
  }
};