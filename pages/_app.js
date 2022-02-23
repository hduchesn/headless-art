import { useEffect } from "react";
import App from "next/app"
import '../styles/animate.css';
import 'bootstrap/dist/css/bootstrap.css';
// import { config } from '@fortawesome/fontawesome-svg-core'
// import '@fortawesome/fontawesome-svg-core/styles.css'
import '../styles/style.css';


// config.autoAddCss = false

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("../public/static/js/jquery.waypoints.min.js");
    import("bootstrap/dist/js/bootstrap");
    import("../public/static/js/main.js");
  }, []);

  return <Component {...pageProps} />
}

// MyApp.getInitialProps = async (appContext) => {
//   // console.log("appContext.ctx.req :",appContext.ctx.req);
//   console.log("appContext.router.query :",appContext.router.query);
//   const appProps = await App.getInitialProps(appContext)
//   return {
//     ...appProps,
//     pageProps: {
//       ...appProps.pageProps,
//     },
//   }
// }

export default MyApp
