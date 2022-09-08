import React from 'react';
import {Row, Col, Container} from 'react-bootstrap';
import {Area} from '@jahia/nextjs-sdk';

export function Footer() {
    return (
        <footer className="site-footer" role="contentinfo">
            <Container>
                <Row className="mb-5">
                    <Col md={4} className="mb-5">
                        <h3>About The Industrial</h3>
                        <p className="mb-5">Far far away, behind the word mountains, far from the countries Vokalia and
                            Consonantia, there live the blind texts. .
                        </p>
                        <ul className="list-unstyled footer-link d-flex footer-social">
                            <li><a href="#" className="p-2"><span className="fa fa-twitter"/></a></li>
                            <li><a href="#" className="p-2"><span className="fa fa-facebook"/></a></li>
                            <li><a href="#" className="p-2"><span className="fa fa-linkedin"/></a></li>
                            <li><a href="#" className="p-2"><span className="fa fa-instagram"/></a></li>
                        </ul>

                    </Col>
                    <Col md={5} className="mb-5 pl-md-5">
                        <h3>Contact Info</h3>
                        <ul className="list-unstyled footer-link">
                            <li className="d-block">
                                <span className="d-block">Address:</span>
                                <span>34 Street Name, City Name Here, United States</span>
                            </li>
                            <li className="d-block">
                                <span className="d-block">Telephone:</span>
                                <span>+1 242 4942 290</span>
                            </li>
                            <li className="d-block">
                                <span className="d-block">Email:</span>
                                <span>info@yourdomain.com</span>
                            </li>
                        </ul>
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
