const webpack = require('webpack');
webpack.ProvideP
module.exports = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }))
    return config;
  },
  async redirects() {
    return [
      {
        source: '/files/:slug*',
        destination: 'http://localhost:8080/files/:slug*',
        permanent: true,
      }
    ]
  },
}
