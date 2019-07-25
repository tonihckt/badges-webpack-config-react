const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    /**
    * ------------------------------------------------------------------------
    *     ENTRY - POINTS
    * ------------------------------------------------------------------------
    **/
  entry: {
    app: path.resolve(__dirname,'src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    // lee desde esta ruta
    // publicPath: 'dist/',
    publicPath: 'http://localhost:1513/',
    chunkFilename: 'js/[id].[chunkhash].js'
  },
  // CONFIG SERVER
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    // open: true,
    port: 1513,
    hot: true,
  },
    /**
    * ------------------------------------------------------------------------
    *     LOADERS - interpreta tipos de archivos
    * ------------------------------------------------------------------------
    **/
  module: {
    rules: [
      // JS _ BABEL
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    // CSS 
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
    // SASS
      // {
      //   test: /\.scss$/,
      //   use: [
      //     {
      //       loader: MiniCssExtractPlugin.loader,
      //     },
      //     'css-loader',
      //     'sass-loader',
      //   ]
      // },
    // URL - LOADER
      {
        test: /\.jpg|png|gif|woff|eot|ttf|svg|mp4|webm$/,
        use: {
          /// exporta los archivos
          loader: 'file-loader',
          options: {
            outputPath: 'assets/',
          }
        }
      },
    ]
  },
    /**
    * ------------------------------------------------------------------------
    *     PLUGINS - extienden las funcionalidades de los loader
    * ------------------------------------------------------------------------
    **/
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
    // cuando renderizas archivos react
      template: path.resolve(__dirname, 'public/index.html')
    }),
  ],
}