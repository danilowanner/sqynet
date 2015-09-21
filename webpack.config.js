var webpack = require('webpack');
var autoprefixer = require('autoprefixer-core');

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
      { test: /\.jsx$/, loaders: ['jsx?harmony'] },
      { test: /autoresponsive-react.*\.js$/, loaders: ['babel'] },
      { test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader' }
    ]
  },
  postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ]
};
