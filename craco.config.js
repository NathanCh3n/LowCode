module.exports = {
  webpack: {
    configure: webpackConfig => {
      if (webpackConfig.mode === 'production') {
        if (webpackConfig.optimization) {
          webpackConfig.optimization = {}
        }
        webpackConfig.optimization.splitChunks = {
          chunks: 'all',
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
