let webpack = require('webpack');
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let OpenBrowserPlugin = require('open-browser-webpack-plugin');

let fs = require('fs');

let host = '127.0.0.1';
const port = 1024;

let plugins = [];

if (~process.argv.indexOf('--watch')) {
  plugins = [];
} else {
  plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'vin-coder blog',
      favicon: 'favicon.ico',
      template: "./template.html",
    }),
    new OpenBrowserPlugin({ url: `http://${host}:${port}` }),
  ];

}



const getUrl = (url) => {
  if (url.endsWith('index.jsx')) {
    return url.substring(url.length, -9);
  }
  return {};
}

// 循环读取 src 项目目录 返回对象 作为entries入口 
const entries = () => {
  let base = path.join(__dirname, './src/modules');
  let file = fs.readdirSync(base);
  let result = Object.create(null);

  fs.readdirSync(base).forEach((file) => {
    file = path.resolve(base, file);

    let stat = fs.statSync(file);

    if (stat && stat.isFile() && fs.existsSync(getUrl(file))) {
      result['blog'] = ["./src", "modules", "index.jsx"].join(path.sep);
    }

  })
  return result;
}

module.exports = {
  entry: Object.assign(entries(), {
    vendor: ['react', 'react-dom', 'react-router', 'axios']
  }),
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'dist')
  },
  mode: "development",
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      query: {
        cacheDirectory: true,
      }
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        { loader: 'css-loader', options: { importLoaders: 1 } },
        'postcss-loader'
      ]
    }]
  },
  devServer: {
    host: host,
    port: port,
    hot: true,
    inline: true,
    disableHostCheck: true, // 
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.js', 'json', '.jsx'],
  },
  plugins: plugins,
}


