import React from 'react';
import Head from 'next/head';
import {JahiaCtx} from '@jahia/nextjs-sdk';
import classNames from 'classnames';
import styles from './pageLayout.module.css';
import * as PropTypes from 'prop-types';
import {Footer} from '../Footer';
import {Header} from '../Header';

// Import {HeartFill} from 'react-bootstrap-icons';
// meta
export function PageLayout({children}) {
    const {isEditMode} = React.useContext(JahiaCtx);

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
            <div className={classNames('top-shadow', {[styles.topShadowEdit]: isEditMode})}/>
            {children}

            <Footer/>
        </>
    );
}

PageLayout.propTypes = {
    children: PropTypes.node.isRequired,
    // Meta: PropTypes.object,
};
