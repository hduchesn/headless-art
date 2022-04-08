import React from 'react';
import Head from "next/head";
import Main from "./jahia/Main";
import Nav from "./Nav";
import {JahiaCtx} from "../lib/context";
import classNames from "classnames";
import styles from "./layout.module.css";
import * as PropTypes from "prop-types";

function Layout({children, path, templateName, meta}) {
    const {isEditMode} = React.useContext(JahiaCtx);
    console.log("[Layout] isEditMode : ", isEditMode);
    //TODO define meta here
    return (
        <>
            <Head>
                <title>Hello</title>

                {isEditMode &&
                    <link type="text/css" href="/gwt/resources/css/jahia-anthracite/edit.css" rel="stylesheet"/>}

            </Head>
            <Main
                path={path}
                templateName={templateName}
            >

                <header role="banner">
                    {/*TODO remove home and start from base*/}
                    <Nav base={`/sites/${process.env.NEXT_PUBLIC_JAHIA_SITE}/home`} path={path}/>
                    <Nav base={`/sites/${process.env.NEXT_PUBLIC_JAHIA_SITE}/home`} path={path}/>
                    {/*<Nav base={`/sites/${config.siteName}/home`} path={path}/>*/}
                </header>
                <div className={classNames("top-shadow", {[styles.topShadowEdit]: isEditMode})}/>
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

Layout.propTypes = {
    children: PropTypes.object.isRequired,
    path: PropTypes.string.isRequired,
    templateName: PropTypes.string.isRequired,
    meta: PropTypes.object
};

export default Layout;
