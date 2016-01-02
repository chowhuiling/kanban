var path = require('path');

//html-webpack-plugin can help to build the index.js file.
var htmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  app: path.resolve(__dirname, 'app'),
  build: path.resolve(__dirname, 'build')
};



//using merge function
var merge = require('webpack-merge');

const TARGET = {
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


// Default configuration
if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {});
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
