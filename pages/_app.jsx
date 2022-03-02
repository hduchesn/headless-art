import React,{ useEffect } from 'react'
import {JahiaCtxProvider} from '../lib/context'
import {NextApiRequest} from "next/dist/shared/lib/utils";
import {client, inMemoryCache} from "../lib/apollo";
import {ApolloProvider} from "@apollo/client";
import {renderToStringWithData} from "@apollo/client/react/ssr";
import App, {AppContext, AppInitialProps, AppProps} from "next/dist/pages/_app";

import {getPageInfo} from '../lib/pages';

import '../styles/style.scss';



// config.autoAddCss = false

const MyApp = ({Component, pageProps: {apolloState, ...pageProps}}) => {

  useEffect(() => {
    console.log("[MyApps] pageProps:",JSON.stringify(pageProps))
  }, [pageProps]);

  // useEffect(() => {
  //   import("../public/static/js/jquery.waypoints.min.js");
  //   import("bootstrap/dist/js/bootstrap");
  //   import("../public/static/js/main.js");
  // }, []);

  // if (process.browser && apolloState) {
  //   console.log('restoring cache..')
  //   inMemoryCache.restore(apolloState);
  // }

  return (
      <h1>Hello world</h1>
  )

  // return (
  //     <JahiaCtxProvider value={{
  //       workspace: pageProps.isPreview ? "EDIT" : "LIVE"
  //     }}>
  //         <ApolloProvider client={client}>
  //             <Component {...pageProps} />
  //         </ApolloProvider>
  //     </JahiaCtxProvider>
  // )
}

// MyApp.getInitialProps = async (appContext) => {
//   let data = await App.getInitialProps(appContext);
//   const isPreview = (appContext.ctx.req).cookies && !!(appContext.ctx.req).cookies.__next_preview_data;
//   // console.log("appContext.ctx : ",appContext.ctx)
//   if (!process.browser ) {//&& (appContext.ctx.pathname === '/ssr/[...path]' || appContext.ctx.pathname === '/ssg/[...path]')
//     console.log("[MyApp.getInitialProps] isPreview :", isPreview);
//     // const path = appContext.ctx.asPath.substr(4)
//     let path = appContext.ctx.asPath
//     const qIndex = path.indexOf('?')
//     if(qIndex!==-1)
//       path = path.substr(0,qIndex)
//
// //TODO get meta of the page
// //     const meta = {
// //       title:"Industrial"
// //     }
//     console.log("[MyApp.getInitialProps] path :", path);
//     // const {data: gqlData} = await client.query({
//     //   query: getPageInfo,
//     //   variables: {path}
//     // });
//
//     const gqlData = await getPageInfo(path)
//     console.log("[MyApp.getInitialProps] gqlData :", gqlData);
//
//     data = {
//       ...data,
//       pageProps: {
//         ...data.pageProps,
//         // meta,
//         path: gqlData.jcr.nodeByPath.path,
//         templateName: gqlData.jcr.nodeByPath.templateName.value,
//         isPreview
//       },
//     }
//
//     console.log("[MyApp.getInitialProps] data :", data);
//
//     const {AppTree} = appContext;
//     const Wrapper = () => (<AppTree {...data}/>)
//
//     console.log('Pre-render:', appContext.ctx.req.url)
//     await renderToStringWithData(<Wrapper/>)
//     console.log('pre-render:done')
//
//     const apolloState = client.extract();
//
//     data = {
//       ...data,
//       pageProps: {
//         ...data.pageProps,
//         apolloState
//       }
//     }
//   }
//
//   return data;
// }

export default MyApp;
