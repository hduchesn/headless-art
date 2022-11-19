import React from 'react';
import Head from 'next/head';
import * as PropTypes from 'prop-types';
import {Header} from '../Header';
import {Footer} from '../Footer';

export function ContentLayout({children}) {
    return (
        <>
            <Head>
                <link rel="icon" type="image/png" href={`${process.env.NEXT_PUBLIC_BASE_URL}/industrial_16x16.png`}/>
                <meta key="metaAuthor" name="author" content="Claire Fuvelle"/>
            </Head>

            <Header/>

            <div className="top-shadow"/>
            {children}
            <Footer/>
        </>
    );
}

ContentLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
