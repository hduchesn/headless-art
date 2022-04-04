import React,{ useEffect } from 'react'
import {JahiaCtxProvider} from '../lib/context'
import {NextApiRequest} from "next/dist/shared/lib/utils";
import {client, inMemoryCache} from "../lib/apollo";
import {ApolloProvider} from "@apollo/client";
import {renderToStringWithData} from "@apollo/client/react/ssr";
import App, {AppContext, AppInitialProps, AppProps} from "next/dist/pages/_app";

import {getPageInfo} from '../lib/pages';

import '../styles/style.scss';
import {getPathAndQuery} from "../lib/utils";



// config.autoAddCss = false

const MyApp = ({Component, pageProps: {apolloState, ...pageProps}}) => {

  useEffect(() => {
    console.log("[MyApps] pageProps:",JSON.stringify(pageProps))
  }, [pageProps]);
    // console.log("[MyApps] pageProps:",JSON.stringify(pageProps))
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
    // import("../public/static/js/jquery.waypoints.min.js");
    // import("../public/static/js/main.js");
  }, []);

  if (process.browser && apolloState) {
    console.log('restoring cache..')
    inMemoryCache.restore(apolloState);
  }

  // return (
  //     <div jahiatype="mainmodule"
  //          path="/sites/headless-industrial/home"
  //          locale="en"
  //          template=""
  //          templateName="default"
  //          nodetypes="nt:base jmix:navMenuItem">
  //       <h1>Hello world</h1>
  //     </div>
  //
  // )

  return (
    <JahiaCtxProvider value={{
      workspace: pageProps.isPreview ? "EDIT" : "LIVE",
      isEditMode: pageProps.isEditMode ? pageProps.isEditMode : false,
      locale:pageProps.locale
    }}>
        <ApolloProvider client={client}>
            <Component {...pageProps} />
        </ApolloProvider>
    </JahiaCtxProvider>
  )
}

MyApp.getInitialProps = async (appContext) => {
  let data = await App.getInitialProps(appContext);

  // console.log("[MyApp.getInitialProps] appContext : ",appContext);
  console.log("[MyApp.getInitialProps] cookies : ",(appContext.ctx.req).cookies);
  let isPreview = (appContext.ctx.req).cookies && !!(appContext.ctx.req).cookies.__next_preview_data;
  isPreview = !!isPreview;
  const workspace = isPreview ? "EDIT" : "LIVE";

  console.log("[MyApp.getInitialProps] isPreview :", isPreview);

  console.log("[MyApp.getInitialProps] appContext.ctx.pathname :", appContext.ctx.pathname)
  if (!process.browser && appContext.ctx.pathname === '/[[...slug]]') {//&& (appContext.ctx.pathname === '/ssr/[...path]' || appContext.ctx.pathname === '/ssg/[...path]')

    // if (!process.browser && appContext.ctx.pathname === '/[[...slug]]') {
      await client.resetStore();
    // }

    console.log("[MyApp.getInitialProps] locale :", appContext.router.locale);
    console.log("[MyApp.getInitialProps] initial path :", appContext.ctx.asPath);
    const [path,query] = getPathAndQuery(appContext.ctx.asPath);

    console.log("[MyApp.getInitialProps] updated path :", path);
    console.log("[MyApp.getInitialProps] updated query :", query);

    //TODO get meta of the page
    //     const meta = {
    //       title:"Industrial"
    //     }

    const {data:gqlData} = await getPageInfo(path,workspace);
    // console.log("[MyApp.getInitialProps] gqlData :", gqlData);

    data = {
      ...data,
      pageProps: {
        ...data.pageProps,
        // meta,
        path: gqlData.jcr.nodeByPath.path,
        templateName: gqlData.jcr.nodeByPath.templateName?.value || 'default',
        isPreview,
        isEditMode: !!query?.edit, //query?.edit === 'true'?true:false,
        locale: query?.locale || appContext.router.locale //'en'
      },
    }

    // console.log("[MyApp.getInitialProps] data :", data);

    const {AppTree} = appContext;
    const Wrapper = () => (<AppTree {...data}/>)

    console.log('Pre-render:', path)
    await renderToStringWithData(<Wrapper/>)
    console.log('pre-render:done')

    const apolloState = client.extract();

    data = {
      ...data,
      pageProps: {
        ...data.pageProps,
        apolloState
      }
    }
  }

  return data;
}

export default MyApp;
