var webpack = require('webpack');
var autoprefixer = require('autoprefixer-core');

module.exports = {
  entry: ['webpack-dev-server/client?http://localhost:8080', 'webpack/hot/only-dev-server', './app/main.jsx'],
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
  devtool: "eval",
  devServer: {
    hot: true,
    contentBase: 'build',
    stats: { colors: true }
  },
  postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ]
};
