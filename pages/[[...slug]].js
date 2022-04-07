import Layout from "../components/layout";
import Template from "../templates";
import {getAllPages} from "../lib/pages";


function DynamicPage(props) {
    const {meta, path, templateName} = props;
    return (
        <Layout meta={meta} path={path} templateName={templateName}>
            <Template {...props}/>
        </Layout>
    );
}

export default DynamicPage;

export const getStaticPaths = async (context) => {
    console.log('[getStaticPaths] start with context : ', context);
    // const allPages = context.locales.map(async (locale) => {
    //     const localePages = await fetchAPI(`/pages?_locale=${locale}`)
    //     return localePages
    // })
    const paths = await getAllPages(context.locales);
    // console.log('[getStaticPaths] paths: ',paths);
    return {
        paths,//: [ '/sites/headless-industrial/home' ],
        fallback: 'blocking'
    }

}

export const getStaticProps = async (context) => {
    // const { params, locale, locales, defaultLocale, preview = null } = context
// console.log("[getStaticProps] context.preview : ", context.preview)
    // Nothing to add
    return {
        props: {
            isPreview: !!context.preview,//not sure it is really needed here
        },
        revalidate: 10
    }
}
