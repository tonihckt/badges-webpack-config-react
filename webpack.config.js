const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TersetJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

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
    filename: 'js/[name].[hash].js',
    // lee desde esta ruta
    // publicPath: 'dist/',
    //cdn de donde parten las rutas
    publicPath: 'http://localhost:1513/',
    chunkFilename: 'js/[id].[chunkhash].js'
  },
  optimization: {
    minimizer: [
      new TersetJSPlugin(),
      new OptimizeCSSAssetsPlugin()
    ]
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
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
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
          loader: 'url-loader',
          options: {
            // base 64
            // limit: 90000,
            limit: 1000,
            name: '[hash].[ext]',
            outputPath: 'assets'
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
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[id].[hash].css'
    }),
    new HtmlWebpackPlugin({
      // cuando renderizas archivos react
      template: path.resolve(__dirname, 'public/index.html')
      // minify: {
		  // collapseWhitespace: true
	    // }
    }),
    // coge la config de Dll
    new webpack.DllReferencePlugin({
      /// se crea cuando se inicia build:dll
      manifest: require('./modules-manifest.json')
    }),
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, 'dist/js/*.dll.js'),
      outputPath: 'js',
      publicPath: 'http://localhost:1513/js'
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/app.*'],
    })
  ],
}