// const webpack = require('webpack');
const path = require('path');
// import path from 'path';

//TODO get file destination from jahia.js
module.exports = {
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    i18n: {
        locales: ['en', 'fr'],
        defaultLocale: 'en',
    },
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
                destination: `${process.env.NEXT_PUBLIC_JAHIA_BASE_URL}/files/:slug*`,
                permanent: true,
            }
        ]
    },
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
