import React from 'react';
import {Row, Col, Container} from 'react-bootstrap';
import {Area} from '@jahia/nextjs-sdk';

export function Footer() {
    return (
        <footer className="site-footer" role="contentinfo">
            <Container>
                <Row className="mb-5">
                    <Col md={4} className="mb-5">
                        <Area
                            name="footer-teaser"
                            path={`/sites/${process.env.NEXT_PUBLIC_JAHIA_SITE}`}
                            tagProps={{
                                nodetypes: ['hicnt:text'],
                                listlimit: 1,
                            }}
                        />

                    </Col>
                    <Col md={5} className="mb-5 pl-md-5">
                        <Area
                            name="footer-contact-info"
                            path={`/sites/${process.env.NEXT_PUBLIC_JAHIA_SITE}`}
                            tagProps={{
                                nodetypes: ['hicnt:text'],
                                listlimit: 1,
                            }}
                        />
                    </Col>
                    <Col md={3} className="mb-5">
                        <Area
                            name="footer-quick-links"
                            path={`/sites/${process.env.NEXT_PUBLIC_JAHIA_SITE}`}
                            tagProps={{
                                nodetypes: ['jnt:navMenuNext'],
                                listlimit: 1,
                            }}
                            // ComponentProps={{referenceComponent:NavMenuFooter}}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col className="text-md-center text-left">
                        <p className="copyright">
                            Copyright &copy; {new Date().getFullYear()} All rights reserved | This template is inspired by
                            template from <a href="https://colorlib.com" target="_blank" rel="noreferrer">Colorlib</a>
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}
