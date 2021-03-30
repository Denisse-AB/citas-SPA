const path = require('path')

module.exports = {
  // Uncomment outputDir for production.
  // outputDir: path.resolve(__dirname, '../server/public'),
  devServer: {
    proxy: {
      '/post': {
            target: 'http://localhost:3000'
      }
    }
  }
}