// const webpack = require('webpack');
const path = require('path');
// import path from 'path';

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  //   config.plugins.push(new webpack.ProvidePlugin({
  //     $: 'jquery',
  //     jQuery: 'jquery',
  //     'window.jQuery': 'jquery'
  //   }))
  //   return config;
  // },
  // async redirects() {
  //   return [
  //     {
  //       source: '/files/:slug*',
  //       destination: 'http://localhost:8080/files/:slug*',
  //       permanent: true,
  //     }
  //   ]
  // },
  // async redirects() {
  //   return [
  //     {
  //       source: '/files/:slug*',
  //       destination: 'http://localhost:8080/files/:slug*',
  //       permanent: true,
  //     },
  //     // {
  //     //   source: '/modules/:slug*',
  //     //   destination: 'http://localhost:8080/modules/:slug*',
  //     //   permanent: true,
  //     // },
  //   ]
  // }
}
