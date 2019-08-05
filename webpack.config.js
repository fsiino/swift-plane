const path = require('path');

module.exports = {
  entry: './src/index.js',
  resolve: {
    extensions: ['.js', '.jsx', '*']
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};