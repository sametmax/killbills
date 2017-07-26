
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var BitBarWebpackProgressPlugin = require("bitbar-webpack-progress-plugin");

var debug = process.env.NODE_ENV !== 'production';

var node_module_path = path.join(__dirname, "node_modules");
var website_static_dir = path.join(__dirname, '../apps/website/static/');

var plugins = [
      new BitBarWebpackProgressPlugin(),  // emit build status. E.G: to display in VSCODE status bar
      new ExtractTextPlugin('[name].css'),  // separate css from JS
      new BrowserSyncPlugin({  // auto reload
        host: 'localhost',
        port: 3000,
        proxy: 'http://localhost:8000/',
        files: [
          "../static/**/*.css",
          "../static/**/*.jsx",
          "../apps/website/templates/**/*.html",
        ],
        browser: "/home/user/.local/share/umake/web/firefox-dev/firefox",
        notify: false
      }),
      // remove dev tools in production
      new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      }
  })
];

if (!debug) {
  plugins.concat([
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        sequences: true,
        dead_code: true,
        conditionals: true,
        booleans: true,
        unused: true,
        if_return: true,
        join_vars: true,
        drop_console: true
      },
      mangle: {
        except: ['$super', '$', 'exports', 'require']
      },
      output: {
        comments: false
      }
    })
  ]);
}

module.exports = {
  context: __dirname,
  debug: debug ? true : false,
  devtool: debug ?  'inline-source-map' : 'hidden-source-map',
  entry: {
    app: path.join(website_static_dir, 'app.jsx'),
    landing_page: path.join(website_static_dir, 'landing_page.jsx')
  },
  output: {
    filename: '[name].bundle.js',
    path: '../static'
  },
  plugins: plugins,
  resolveLoader: {
        modulesDirectories: [
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
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            require.resolve('babel-preset-es2015'),
            require.resolve('babel-preset-react'),
            require.resolve('babel-preset-es2016'),
          ],
          plugins: [
            require.resolve("babel-plugin-transform-object-rest-spread"),
          ],

        }
      }
    ]
  }
}


