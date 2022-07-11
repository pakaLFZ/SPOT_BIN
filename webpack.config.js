const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
  merge
} = require('webpack-merge')
const CopyPlugin = require('copy-webpack-plugin')
const apiMocker = require('mocker-api')

const commonConfig = {
  /* 入口 */
  entry: [
    'react-hot-loader/patch',
    path.join(__dirname, 'src/index.jsx')
  ],

  /* 输出到dist文件夹，输出文件名字为bundle.js */
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  /* src文件夹下面的以.js结尾的文件，要使用babel解析 */
  /* cacheDirectory是用来缓存编译结果，下次编译加速 */
  module: {
    rules: [{
      test: /\.svg$/,
      use: ['@svgr/webpack']
    }, {
      test: /\.(j|t)sx?$/,
      use: ['babel-loader?cacheDirectory=true'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.((le|c)ss)$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: true
          }
        },
        'less-loader'
      ],
      exclude: /\.global\.less$/
    }, {
      test: /\.(less)$/,
      use: [
        'style-loader',
        'css-loader',
        'less-loader'
      ], // compiles Less to CSS
      include: /\.global\.less$/
    }, {
      test: /\.(png|jpg|gif|woff|ttf|eot)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8192
        }
      }]
    }, {
      test: /\.(txt|md)$/,
      use: 'raw-loader'
    }]
  },

  resolve: {
    alias: {
      pages: path.join(__dirname, 'src/pages'),
      component: path.join(__dirname, 'src/component'),
      router: path.join(__dirname, 'src/router'),
      actions: path.join(__dirname, 'src/redux/actions'),
      reducers: path.join(__dirname, 'src/redux/reducers'),
      layouts: path.join(__dirname, 'src/layouts'),
      assets: path.join(__dirname, 'src/assets'),
      'react-dom': '@hot-loader/react-dom',
      changelog: path.join(__dirname, 'CHANGELOG.md') // Access changelog markdown in pages
    },
    extensions: ['.js', '.jsx', '.tsx', '.ts', '.json']
  },

  plugins: [
    new CompressionPlugin({
      algorithm: "gzip",
      test: /\.less$|\.jsx$|\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0
    }),
    new HtmlWebpackPlugin({
      hash: true,
      title: 'SPOT',
      production: true
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/public', to: 'assets' }
      ]
    })
  ]
}

const developmentConfig = {
  mode: 'development',

  devServer: {
    before (app) {
      apiMocker(app, path.resolve('./mocker/index.js'), {
        proxy: {},
        changeHost: true
      })
    },
    contentBase: path.join(__dirname, './dist'),
    historyApiFallback: true,
    openPage: '' // 防止访问localhost:8080/undefined
  },

  devtool: 'inline-source-map'
}

const productionConfig = {
  mode: 'production'
}

module.exports = env => {
  switch (env) {
    case 'development':
      return merge(commonConfig, developmentConfig)
    case 'production':
      return merge(commonConfig, productionConfig)
    default:
      throw new Error('No matching configuration was found!')
  }
}
