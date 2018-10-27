module.exports = {
  mode: 'development',
  devtool: 'inline-soruce-map',
  entry: './src/js/main.js',
  output: {
    path: __dirname + '/dist',
    filename: 'jquery-mutation-observe.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader?presets=env',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
  },
  devServer: {
    contentBase: __dirname + '/dist',
    inline: true,
    hot: true,
    open: true
  }
};