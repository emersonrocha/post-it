const path = require('path');

module.exports = {
  entry: './meu/index.js',
  output: {
    filename: 'meu.js',
    path: path.resolve(__dirname, 'js')
  },
  module: {
    rules: [
      {
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: "babel-loader"
      }
    ]
  }
};