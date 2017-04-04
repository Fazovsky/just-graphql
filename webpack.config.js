'use strict';

module.exports = {
  entry: [
    './index.js'
  ],
  output: {
    library: 'justGraphql',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
};
