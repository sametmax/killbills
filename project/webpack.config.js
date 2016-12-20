
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

var debug = process.env.NODE_ENV !== 'production';

var node_module_path = path.join(__dirname, "node_modules");
var website_static_dir = path.join(__dirname, '../apps/website/static/');

var plugins = [
      new ExtractTextPlugin('[name].css'),
      new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000,
        proxy: 'http://localhost:8000/',
        files: [
          "../static/**/*.css",
          "../static/**/*.js",
          "../apps/website/templates/**/*.html",
        ],
      })
];

if (!debug) {
  plugins.concat([
    new webpack.optimize.DedupPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJSPlugin({mangle: false, sourcemap: false})
  ]);
}

module.exports = {
  context: __dirname,
  devtool: debug ? 'sourcemap' : null,
  entry:  path.join(website_static_dir, 'all.js'),
  output: {
    filename: 'bundle.js',
    path: '../static'
  },
  plugins: plugins,
  resolveLoader: {
        modulesDirectories: [
            path.resolve(website_static_dir, "components"),
            node_module_path
        ]
  },
  resolve: {
    root: __dirname,
    modulesDirectories: [
      path.resolve(website_static_dir, "components"),
      node_module_path,
    ],
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
          test: /\.sass/,
          loader: ExtractTextPlugin.extract('style-loader',
                                            'css-loader!sass-loader!')
      },
      {
          test: /\.css/,
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loaders: [
              'file?hash=sha512&digest=hex&name=[name].[ext]',
          ]
      },
      {
        test: /\.js(x)?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: [
            require.resolve('babel-preset-react'),
            require.resolve('babel-preset-es2016'),
          ]
        }
      }
    ]
  },
  sassLoader: {
    includePaths: [path.resolve(website_static_dir, "vendors")],
  }
}


