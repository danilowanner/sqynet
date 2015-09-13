var webpack = require('webpack');
var autoprefixer = require('autoprefixer-core');

var host = "192.168.0.19";

module.exports = {
  devtool: "eval",
  devServer: {
    hot: true,
    host: host,
    contentBase: 'build',
    stats: { colors: true }
  },
  entry: [
    './app/main.jsx',
    'webpack/hot/only-dev-server',
    'webpack-dev-server/client?http://'+host+':8080'
  ],
  output: {
    path: './build',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.jsx$/, loaders: ['react-hot','jsx-loader?harmony'] },
      { test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader' }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ]
};
