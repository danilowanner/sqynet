module.exports = {
  entry: ['webpack/hot/dev-server', './app/main.jsx'],
  output: {
    path: './build',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.jsx$/, loader: 'jsx-loader' }
    ]
  }
};
