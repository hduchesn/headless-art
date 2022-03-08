import Head from "next/head";
import Main from "./jahia/Main";
import Script from "next/script";
const Layout = ({children,isEdit,path,templateName,meta}) => {
    //TODO define meta here
    return(
        <>
            <Head>
                <title>Hello</title>

                {isEdit &&
                    <link type="text/css" href="/gwt/resources/css/jahia-anthracite/edit.css" rel="stylesheet"/>
                }

            </Head>
            <Main path={path}
                  templateName={templateName}
                  locale="en"
                  isEdit={isEdit}>
                {children}
            </Main>

            {/*<div jahiatype="mainmodule"*/}
            {/*     path={path}*/}
            {/*     locale="en"*/}
            {/*     template=""*/}
            {/*     templateName={templateName}*/}
            {/*     nodetypes="nt:base jmix:navMenuItem">*/}
            {/*    {children}*/}
            {/*</div>*/}

            {/*<Script src="/static/js/jquery-3.2.1.min.js" strategy="beforeInteractive" />*/}
            {/*<Script src="/static/js/popper.min.js"  />*/}
            {/*<Script src="/static/js/bootstrap.min.js"  />*/}
            {/*<Script src="/static/js/owl.carousel.min.js"  />*/}
            {/*<Script src="/static/js/jquery.waypoints.min.js"  />*/}
            {/*<Script src="/static/js/jquery.fancybox.min.js"  />*/}
            {/*<Script src="/static/js/main.js"  />*/}
        </>
    )
}
export default Layout;
