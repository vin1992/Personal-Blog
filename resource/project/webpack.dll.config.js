const webpack = require('webpack')
const library = '[name]'
const path = require('path')

module.exports = {
  entry: {
    vendors: ['react', 'react-dom', 'react-router', 'axios', 'bootstrap', 'react-quill']
  },

  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, 'dist'),
    library
  },

  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'dist/[name]-manifest.json'),
      // This must match the output.library option above
      name: library
    }),
  ],
}
