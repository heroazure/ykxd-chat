var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    app: './app/index.js'
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.json', '.scss','.less', '.css', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      'vue':'vue/dist/vue.js',
      //'fn':path.resolve(__dirname, '../src/assets/less/base/fn')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    preLoaders: [
      /*{
        test: /\.vue$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      }*/
    ],
    loaders: [
      {
        test: /\.css$/,
        include:[path.join(__dirname,'../app')],
        loader: "style!css?importLoaders=1!postcss"
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loader: "style!css?importLoaders=1"
      },

      {
        test: /\.vue$/,
        loader: 'vue',

      },

      {
        test: /\.less$/,
        include:[path.join(__dirname,'../app/assets/css/')],
        loader:ExtractTextPlugin.extract("style", "css?importLoaders=1!postcss!less")
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  /*eslint: {
    formatter: require('eslint-friendly-formatter')
  },*/
  vue: {
    loaders: {
      js: 'babel',
      css:ExtractTextPlugin.extract('style', 'css?importLoaders=1!postcss'),
      less:ExtractTextPlugin.extract('style', 'css?importLoaders=1!postcss!less')
    }
  },
  postcss: [
    require('postcss-salad')(),
    require('precss')(),
    require('postcss-px2rem')({
      baseDpr: 2,             // base device pixel ratio (default: 2)
      threeVersion: false,    // whether to generate @1x, @2x and @3x version (default: false)
      remVersion: true,       // whether to generate rem version (default: true)
      remUnit: 14,            // rem unit value (default: 75)>0.1%,not ie<100,not edge<100,not firefox<100,not opera<100
      remPrecision: 6         // rem precision (default: 6){browsers: ['last 2 versions']}
    }),//{browsers: ['>0.1%','not ie<100','not ie_mob<100','not edge<100','not firefox<100','not opera<100']}
    require('autoprefixer')(),//browsers配置在根路径下的browserslist文件中
    require('cssnano')(),//优化和压缩css代码
  ],
}
