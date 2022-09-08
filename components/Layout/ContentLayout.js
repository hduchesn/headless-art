import React from 'react';
import Head from 'next/head';
import {JahiaCtx} from '@jahia/nextjs-sdk';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import {Header} from '../Header';
import {Footer} from '../Footer';

export function ContentLayout({children}) {
    const {isEditMode} = React.useContext(JahiaCtx);
    // TODO extract current page from content path
    // With <HeartFill className="text-danger"/> by <a href="https://colorlib.com" target="_blank" rel="noreferrer">Colorlib</a>
    return (
        <>
            <Head>
                <title>Hello</title>
                {/* Note:  define meta here */}

                {isEditMode
                    && <link type="text/css" href="/gwt/resources/css/jahia-anthracite/edit.css" rel="stylesheet"/>}
            </Head>

            <Header/>

            <div className={classNames('top-shadow')}/>
            {children}
            <Footer/>
        </>
    );
}

ContentLayout.propTypes = {
    children: PropTypes.node.isRequired,
    // Id: PropTypes.string,
    // Meta: PropTypes.object,
};
