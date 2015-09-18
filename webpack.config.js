var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var env = process.env.WEBPACK_ENV;
var WebpackDevServer = require('webpack-dev-server');

var plugins = [], outputFile;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = 'festival.min.js';
} else {
  outputFile = 'festival.js';
}

var config = {
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    publicPath: __dirname + '/example'
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'jsx',
        exclude: /node_modules/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      }
    ]
  },
  plugins: plugins
};

new WebpackDevServer(webpack(config), {
  contentBase: './example',
  hot: true,
  debug: true
}).listen(9000, '0.0.0.0', function (err, result) {
  if (err) {
    console.log(err);
  }
});

module.exports = config;