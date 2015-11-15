var webpack = require('webpack');
var autoprefixer = require('autoprefixer-core');

var host = "localhost";

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
      { test: /\.jsx$/, loaders: ['react-hot','jsx?harmony'] },
      { test: /autoresponsive-react.*\.js$/, loaders: ['babel'] },
      { test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader' }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    }),
    new webpack.NoErrorsPlugin()
  ],
  postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ]
};
