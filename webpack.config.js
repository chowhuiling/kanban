var path = require('path');

//html-webpack-plugin can help to build the index.js file.
var htmlWebpackPlugin = require('html-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.resolve(__dirname, 'app'),
  build: path.resolve(__dirname, 'build')
};



//using merge function
var merge = require('webpack-merge');

const common = {
  //entry accepts a path or an object of entries.
  entry: PATHS.app,
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  plugins: [
    new htmlWebpackPlugin({
      title: 'Kanban app'
    })
  ],
  module: {
    preloaders: [
    {
      test: /\.js?$/,
      loaders: ['jshint'],
      include: PATHS.app
    }],
    loaders: [
    {
      //Test expects a RegExp! Note the slashes.
      test: /\.css$/,
      //loaders are invoked from right to left.
      //css loader will resolve @import and url statements in css files
      //then style-loader deals with require statements in our javascript
      loaders: ['style', 'css'],
      // Include accepts either a path or an array of paths.
      // Always set this or webpack will traverse all files in base directory.
      // can use 'exclude' also.
      include: PATHS.app
    }
    ]
  }
};

var webpack = require('webpack');

// Default configuration
if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,

      //Display only errors to reduce amt of output.
      stats: 'errors-only',

      //parse host and port from env so this is easy to customize.
      host: process.env.HOST,
      //default is port 8080, to use other default, can declare as below
      port: 3000 || process.env.PORT
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}

if (TARGET === 'build') {
  module.exports = merge(common, {});
}


//without using merge funtion: no hot-reload.
/*
module.exports = {
  //Entry accepts a path or an object of entries.
  //The build chapter contains an example of the latter.
  entry: PATHS.app,
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  plugins: [
    new htmlWebpackPlugin({
      title: 'Kanban App'
    })
  ]
};
*/
