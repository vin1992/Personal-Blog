let webpack = require('webpack');
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let fs = require('fs');

// 循环读取 src 项目目录 返回对象 作为entries入口 
const entries = () => {
  let base = path.join(__dirname, './src/modules');
  let result = Object.create(null);

  fs.readdirSync(base).forEach((file) => {
    file = path.resolve(base, file);

    let stat = fs.statSync(file);

    if (stat && stat.isDirectory() && fs.existsSync(path.join(file, 'index.jsx'))) {
      let name = path.join('modules', path.basename(file));
      result[name] = ["./src", name, "index.jsx"].join(path.sep);
    }

  })
  return result;
}


module.exports = (env, args) => {
  env = env || process.env.NODE_ENV;
  const config = Config(env);
  console.dir(env, config.plugin, '环境');

  return {
    entry: Object.assign(entries(), {
      vendor: ['react', 'react-dom', 'react-router', 'axios', 'bootstrap'],
      antd: ['antd'],
    }),
    output: {
      filename: '[name].bundle.js',
      // chunkFilename: '[name].bundle.js',
      path: path.join(__dirname, 'dist'),
      publicPath: '/' // 存放静态资源文件
    },
    mode: config.mode,
    module: {
      rules: [{
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: false,
        }
      }, {
        test: /\.css$/,
        use: [
          // MiniCssExtractPlugin.loader,
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader'
        ]
      }, {
        test: /\.(png|jpg|gif|JPG|GIF|PNG|BMP|bmp|JPEG|jpeg)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },]
    },
    // optimization: {
    //   splitChunks: {
    //     minChunks: 1,
    //     minSize: 30000,
    //     cacheGroups: {
    //       styles: {
    //         name: 'styles',
    //         test: /\.css$/,
    //         chunks: 'all',
    //         enforce: true
    //       }
    //     }
    //   },
    //   runtimeChunk: {
    //     name: "manifest"
    //   }
    // },
    devtool: config.devtool,
    devServer: {
      host: '127.0.0.1',
      port: config.port,
      hot: true,
      inline: true,
      disableHostCheck: true, // 
      historyApiFallback: true,
      setup: function (app) {
        app.all('/*/ajax/**', function (req, res) {
          // req.query
          var path = './mock' + req.path.replace(/\/ajax/, '');
          delete require.cache[require.resolve(path)];
          // res.json(require(path)());
          setTimeout(function () { res.json(require(path)) }, 500);
        });
      }
    },
    resolve: {
      extensions: ['.js', 'json', '.jsx'],
    },
    plugins: config.plugins,
  }
}


function Config(env) {
  return {
    port: 1234,
    get plugins() {
      if (env == 'production') {
        return [  // 生产环境
          new webpack.DllReferencePlugin({ // 
            context: __dirname,
            manifest: require('./dist/vendors-manifest.json')
          }),
          new MiniCssExtractPlugin({
            filename: "[name].css",
          }),
          new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
          }),
          new webpack.ProvidePlugin({
            'window.Quill': 'quill'
          })
        ]
      }
      return [  // 开发环境
        new MiniCssExtractPlugin({
          filename: "[name].css",
        }),
        new CleanWebpackPlugin(['dist']),
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(env || 'development')
        }),
        new HtmlWebpackPlugin({
          title: 'vin-coder blog',
          favicon: 'favicon.ico',
          template: "./template.html",
        }),
        new webpack.ProvidePlugin({
          'window.Quill': 'quill'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HashedModuleIdsPlugin(),
      ]
    },
    get devtool() {
      if (env == 'production') {
        return 'source-map'
      }
      return false
    },
    get mode() {
      if (env == 'production') {
        return 'production'
      }
      return 'development'
    }
  }
}
