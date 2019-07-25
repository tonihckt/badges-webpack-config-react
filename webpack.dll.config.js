const path = require('path')
const webpack = require('webpack')
const TersetJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    /**
    * ------------------------------------------------------------------------
    *     ENTRY - POINTS
    * ------------------------------------------------------------------------
    **/
  entry: {
    modules: [
      'react',
      'react-dom',
      'react-router-dom',
    ]
  },
  optimization: {
    minimizer: [
      new TersetJSPlugin(),
      new OptimizeCSSAssetsPlugin()
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[hash].dll.js',
    // enlaza de manera global el js con el codigo
    library: '[name]',
  },
    /**
    * ------------------------------------------------------------------------
    *     PLUGINS - extienden las funcionalidades de los loader
    * ------------------------------------------------------------------------
    **/  
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      // este archivo se pasa por webpack.config
      path: path.join(__dirname, '[name]-manifest.json')
    })
  ],
}