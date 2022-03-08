import { useRouter } from 'next/router'

import Layout from "../components/layout";
import Template from "../templates";
import {getAllPages} from "../lib/pages";



const DynamicPage = (props) => {
    const {meta,isEdit,path,templateName} = props;
    return (
        <Layout meta={meta} isEdit={isEdit} path={path} templateName={templateName}>
            <Template {...props}/>
        </Layout>
    );
}

export default DynamicPage;

export const getStaticPaths = async (context) => {
    const paths = await getAllPages();
    console.log('[getStaticPaths] paths: ',paths);
    return {
        paths,//: [ '/sites/headless-industrial/home' ],
        fallback: 'blocking'
    }

}

export const getStaticProps = async (context) => {
    // const { params, locale, locales, defaultLocale, preview = null } = context
    console.log("[getStaticProps] context.preview : ", context.preview)
    console.log("[getStaticProps] isPreview : ", !!context.preview)
    // Nothing to add
    return {
        props: {
            isPreview: !!context.preview,
            // content
        },
        revalidate: 10
    }
}
