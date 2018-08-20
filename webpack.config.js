const path = require('path');

module.exports = {
  context: __dirname,
  devtool: 'source-map',
  mode: 'production',
  entry: path.resolve(__dirname, 'src', 'index.ts'),
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'lampix-screensaver.js',
    library: ['lampix', 'screensaver'],
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
};
