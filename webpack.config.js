const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageMinPlugin = require('imagemin-webpack-plugin');

const extractHTML = new ExtractTextPlugin('index.html');
const extractCSS = new ExtractTextPlugin('css/style.css');

const conf = {
  //context: path.resolve(__dirname, 'dist'),

  entry: [
    './src/js/app.js',
    './src/slim/index.slim',
    './src/scss/style.scss'
  ],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/build.js',
  },

  devServer: {
    overlay: true
  },

  module: {
    rules: [{
        test: /\.modernizrrc.js$/,
        use: ['modernizr-loader']
      },
      {
        test: /\.modernizrrc(\.json)?$/,
        use: ['modernizr-loader', 'json-loader']
      }, {
        test: /\.slim$/,
        use: extractHTML.extract({
          use: [{
            loader: 'html-loader',
            options: {
              minimize: false
            }
          }, {
            loader: 'slim-lang-loader',
            options: {
              slimOptions: {
                //'pretty': true
              }
            }
          }]
        })
      }, {
        test: /\.scss$/,
        use: extractCSS.extract({
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }, {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }],
          fallback: 'style-loader'
        })
      }, {
        test: /\.(png|gif|jpe?g)$/,
        loaders: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './images/'
            },
          },
          'img-loader',
        ]
      }, {
        test: /\.svg$/,
        use: [{
          loader: 'svg-url-loader',
          options: {
            encoding: 'base64'
          }
        }, {
          loader: 'svgo-loader',
          options: {
            plugins: [{
              removeViewBox: false
            }]
          }
        }, ]
      }
    ]
  },
  resolve: {
    alias: {
      modernizr$: path.resolve(__dirname, '.modernizrrc')
    }
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    extractHTML,
    extractCSS,
    new CopyWebpackPlugin(
      [{
        from: './src/images',
        to: 'images'
      }], {
        ignore: [{
          glob: 'svg/*'
        }]
      }
    )
  ]
};

module.exports = conf;
