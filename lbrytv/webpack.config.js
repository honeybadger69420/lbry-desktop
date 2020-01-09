const { WEBPACK_WEB_PORT, LBRY_TV_API } = require('../config.js');
const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('../webpack.base.config.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { DefinePlugin, ProvidePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const STATIC_ROOT = path.resolve(__dirname, '../static/');
const UI_ROOT = path.resolve(__dirname, '../ui/');
const DIST_ROOT = path.resolve(__dirname, 'dist/');
const WEB_PLATFORM_ROOT = __dirname;

const webConfig = {
  target: 'web',
  entry: {
    ui: '../ui/index.jsx',
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: __dirname + '/dist/public/',
    publicPath: '/public/',
  },
  devServer: {
    port: WEBPACK_WEB_PORT,
    contentBase: path.join(__dirname, 'dist'),
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
      // cacheGroups: {
      //   default: false,
      //   vendors: false,
      // vendor: {
      //   // sync + async chunks
      //   chunks: 'all',
      //   // import file path containing node_modules
      //   test: /node_modules/,
      // },
      // common: {
      //   name: 'common',
      //   minChunks: 2,
      //   chunks: 'async',
      // },
      // },
    },
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.jsx?$/,
        options: {
          presets: ['@babel/env', '@babel/react', '@babel/flow'],
          plugins: [
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-proposal-class-properties',
          ],
        },
      },
      {
        loader: 'preprocess-loader',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        options: {
          TARGET: 'web',
          ppOptions: {
            type: 'js',
          },
        },
      },
    ],
  },
  resolve: {
    modules: [UI_ROOT, __dirname],

    alias: {
      electron: `${WEB_PLATFORM_ROOT}/stubs/electron.js`,
      fs: `${WEB_PLATFORM_ROOT}/stubs/fs.js`,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(STATIC_ROOT, 'index-web.html'),
      // filename: path.resolve(DIST_ROOT, 'index.html'),
      filename: '../index.html',
    }),
    new CopyWebpackPlugin([
      // {
      //   from: `${STATIC_ROOT}/index-web.html`,
      //   to: `${DIST_ROOT}/index.html`,
      // },
      {
        from: `${STATIC_ROOT}/img/favicon.png`,
        to: `${DIST_ROOT}/public/favicon.png`,
      },
      {
        from: `${STATIC_ROOT}/img/og.png`,
        to: `${DIST_ROOT}/public/og.png`,
      },
      {
        from: `${STATIC_ROOT}/font/`,
        to: `${DIST_ROOT}/public/font/`,
      },
    ]),
    new DefinePlugin({
      IS_WEB: JSON.stringify(true),
      'process.env.SDK_API_URL': JSON.stringify(process.env.SDK_API_URL || LBRY_TV_API),
    }),
    new ProvidePlugin({
      __: ['i18n.js', '__'],
    }),
  ],
};

module.exports = merge(baseConfig, webConfig);
