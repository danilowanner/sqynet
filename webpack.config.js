var webpack = require('webpack');

module.exports = {
  entry: ['webpack-dev-server/client?http://localhost:8080', 'webpack/hot/only-dev-server', './app/main.jsx'],
  output: {
    path: './build',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.jsx$/, loaders: ['react-hot','jsx-loader'] },
      { test: /\.css$/, loader: 'style-loader!css-loader' }
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
  }
};
