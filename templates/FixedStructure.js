import React from 'react';
import Area from "../components/jahia/Area";
import * as PropTypes from "prop-types";
import cms from "../jahia"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';

function FixedStructure({path}) {
    return (
        <>
            <Area
                name="hero"
                mainResourcePath={path}
                allowedTypes={[cms.contentTypes.HERO]}
            />
            {/*Feature*/}
            <section className="section">
                <Container>
                    <Row className="mb-5">
                        <Col className="text-center">
                            <Area
                                name="feature-title"
                                mainResourcePath={path}
                                allowedTypes={[cms.contentTypes.INDUS_TEXT]}
                            />
                        </Col>
                    </Row>
                    <Row className="align-items-stretch">
                        <Col lg={4} className="order-lg-2">
                            <Area
                                name="feature-image"
                                mainResourcePath={path}
                                allowedTypes={[cms.contentTypes.IMAGE_REF,cms.contentTypes.WIDEN_REF]}
                            />
                        </Col>
                        <Col md={6} lg={4} className="feature-1-wrap d-md-flex flex-md-column order-lg-1">
                            <Area
                                name="feature-text-1"
                                mainResourcePath={path}
                                allowedTypes={[cms.contentTypes.INDUS_TEXT]}
                            />
                        </Col>
                        <Col md={6} lg={4} className="feature-1-wrap d-md-flex flex-md-column order-lg-3">
                            <Area
                                name="feature-text-2"
                                mainResourcePath={path}
                                allowedTypes={[cms.contentTypes.INDUS_TEXT]}
                            />
                        </Col>
                    </Row>
                </Container>
            </section>
            {/*Gallery*/}
            <section className="section border-t pb-0">
                <Container>
                    <Row className="mb-5 justify-content-center">
                        <Col md={8} className="text-center">
                            <Area
                                name="gallery-title"
                                mainResourcePath={path}
                                allowedTypes={[cms.contentTypes.INDUS_TEXT]}
                            />
                        </Col>
                    </Row>
                </Container>
                <Container fluid>
                    <Row className="mb-5 no-gutters">
                        {Array.from({length: 6}, (v, i) => i).map( (v, i) => (
                            <Col key={v} md={4} className="text-center">
                                <Area
                                    name={`gallery-item-${i+1}`}
                                    mainResourcePath={path}
                                    allowedTypes={[cms.contentTypes.GALLERY]}
                                />
                            </Col>
                        ))}
                        {/*<Col md={4} className="text-center">*/}
                        {/*    <Area*/}
                        {/*        name="gallery-item-1"*/}
                        {/*        mainResourcePath={path}*/}
                        {/*        allowedTypes={[cms.contentTypes.GALLERY]}*/}
                        {/*    />*/}
                        {/*</Col>*/}
                    </Row>
                </Container>
            </section>
        </>

    )
}
FixedStructure.propTypes = {
    path: PropTypes.string.isRequired
};

export default FixedStructure;


