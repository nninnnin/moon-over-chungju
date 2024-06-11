const path = require('path');

module.exports = {
  entry: './lambda-client.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lambda-client-bundled.js'
  }
}
