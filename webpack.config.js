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
  ]
};

var webpack = require('webpack');

// Default configuration
if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
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
