module.exports = {
  webpack: {
    configure: webpackConfig => {
      // 生产环境：抽离公共代码
      if (webpackConfig.mode === 'production') {
        if (webpackConfig.optimization === null) {
          webpackConfig.optimization = {}
        }
        webpackConfig.optimization.splitChunks = {
          chunks: 'all',
          // 采用缓存，提高打包速度
          cacheGroups: {
            antd: {
              name: 'antdchunk',
              test: /antd/,
              priority: 100,
            },
            reactDom: {
              name: 'reactDom-chunk',
              test: /react-dom/,
              priority: 99,
            },
            // 第三方插件
            vendors: {
              name: 'vendors-chunk',
              test: /node_modules/,
              priority: 98,
            },
          },
        }
      }
      return webpackConfig
    },
  },
  devServer: {
    port: 8000, // B端
    proxy: {
      // '/api': 'http://localhost:3001',
      // '/api': 'http://localhost:3005',
    },
  },
}
