var webpack = require('webpack');
var autoprefixer = require('autoprefixer-core');

var host = "localhost";

module.exports = {
  devtool: "source-map",
  entry: [
    './app/main.jsx'
  ],
  output: {
    path: './build',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.jsx$/, loaders: ['jsx-loader?harmony'] },
      { test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader' }
    ]
  },
  postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ]
};
