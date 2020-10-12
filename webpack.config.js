const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: process.env['NODE_ENV'] === 'production' ? 'production' : 'development',
  devtool: process.env['NODE_ENV'] === 'production' ? false : 'inline-source-map',

  entry: resolve(__dirname, 'src', 'index.tsx'),
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.[hash].js',
    publicPath: '/',
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Currency Converter',
    }),
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },

  devServer: {
    writeToDisk: true,
    https: true,
    contentBase: resolve(__dirname, 'dist'),
    historyApiFallback: true,
  },
};
