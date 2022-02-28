import Head from "next/head";
import Script from "next/script";
const Layout = ({children,meta}) => {
    return(
        <>
            <Head>
                <title>{meta.title}</title>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:400,700|Oxygen:400,700" />
                <link rel="stylesheet" href="/static/css/animate.css"/>
                <link rel="stylesheet" href="/static/css/owl.carousel.min.css"/>
                <link rel="stylesheet" href="/static/css/jquery.fancybox.min.css"/>
                {/*<link rel="stylesheet" href="/static/font/"/>*/}
                <link rel="stylesheet" href="/static/css/style.css" />

            </Head>
            {children}
            <Script src="/static/js/jquery-3.2.1.min.js" strategy="beforeInteractive" />
            <Script src="/static/js/popper.min.js"  />
            <Script src="/static/js/bootstrap.min.js"  />
            <Script src="/static/js/owl.carousel.min.js"  />
            <Script src="/static/js/jquery.waypoints.min.js"  />
            <Script src="/static/js/jquery.fancybox.min.js"  />
            <Script src="/static/js/main.js"  />
        </>
    )
}
export default Layout;
