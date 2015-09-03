var webpack = require('webpack');

var node_dir = __dirname + '/node_modules';

module.exports = {
  entry: ['./app/main.js'],
  output: {
    path: 'dist',
    filename: 'bundle.js',

    publicPath: 'dist/'
    },
    plugins: [new webpack.optimize.CommonsChunkPlugin('main', null, false)],
    module: {
        noParse: [node_dir + '/react/dist/react.min.js'],
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    }
};
