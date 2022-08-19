// const webpack = require('webpack');
const path = require('path');

const getLocales = () => {
    try{
        return JSON.parse(process.env.NEXT_LOCALES)
    }catch(e){
        console.error("process.env.NEXT_LOCALES JSON parsing error, use fallback [\"en\", \"fr\"]. Error: ",e);
        return ['en', 'fr'];
    }
}

module.exports = {
    reactStrictMode: false,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    i18n: {
        locales: getLocales(),
        defaultLocale: process.env.NEXT_DEFAULT_LOCALE || 'en',
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
            },
            {
                source: '/modules/:slug*',
                destination: `${process.env.NEXT_PUBLIC_JAHIA_BASE_URL}/modules/:slug*`,
                permanent: true,
            },
            {
                source: "/",
                destination: `/sites/${process.env.NEXT_PUBLIC_JAHIA_SITE}/home`,
                permanent: true,
            }

        ]
    },
    // outputFileTracing: true
    //if you want to expose more file type update the default pageExtensions ['tsx', 'ts', 'jsx', 'js']
    // pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],
}
