module.exports = {
  devServer: {
    host: '192.168.0.104'
  },
  publicPath: './',
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 75,
            unitPrecision: 5,
            propList: ['*'],
            replace: true,
            mediaQuery: false,
            minPixelValue: 0
          })
        ]
      }
    }
  }
}
