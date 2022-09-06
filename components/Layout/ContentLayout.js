import React from 'react';
import Head from 'next/head';
import Nav from '../Nav/Nav';
import {JahiaCtx} from '@jahia/nextjs-sdk';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Header} from "../Header";
import {Footer} from "../Footer";

export function ContentLayout({children, path}) {
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
            {/*<header role="banner">*/}
            {/*    <Nav base={`/sites/${process.env.NEXT_PUBLIC_JAHIA_SITE}`} path={path}/>*/}
            {/*</header>*/}
            <div className={classNames('top-shadow')}/>
            {children}
            <Footer/>
            {/*<footer className="site-footer" role="contentinfo">*/}
            {/*    <Container>*/}
            {/*        <Row>*/}
            {/*            <Col className="text-md-center text-left">*/}
            {/*                <p className="copyright">*/}
            {/*                    Copyright &copy; {new Date().getFullYear()} All rights reserved | This template is inspired by*/}
            {/*                    template from <a href="https://colorlib.com" target="_blank" rel="noreferrer">Colorlib</a>*/}
            {/*                </p>*/}
            {/*            </Col>*/}
            {/*        </Row>*/}
            {/*    </Container>*/}
            {/*</footer>*/}
        </>
    );
}

ContentLayout.propTypes = {
    children: PropTypes.node.isRequired,
    path: PropTypes.string.isRequired,
    // Id: PropTypes.string,
    // Meta: PropTypes.object,
};
