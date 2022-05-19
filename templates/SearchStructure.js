import React from 'react';
import Area from "../components/jahia/Area";
import * as PropTypes from "prop-types";
import cms from "../jahia"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Layout from "../components/Layout";

function SearchStructure({path, templateName}) {
    return (
        /*Field*/
        <Layout templateName={templateName} path={path}>
            <Col className="text-center">
                <Area
                    name="augmentedsearch"
                    mainResourcePath={path}
                    tagProps={{
                        nodetypes: [cms.contentTypes.AUGMENTED_SEARCH],
                        listlimit: 1
                    }}
                />
            </Col>
            {/*Results*/}
            <section className="section bg-light">{/*element-animate*/}
                <Container>
                    <Row className="mb-5">
                        <Col className="text-center">
                            <Area
                                name="feature-title"
                                mainResourcePath={path}
                                tagProps={{
                                    nodetypes: [cms.contentTypes.INDUS_TEXT],
                                    listlimit: 1
                                }}
                            />
                        </Col>
                    </Row>
                    <Row className="align-items-stretch">

                    </Row>
                </Container>
            </section>
        </Layout>
    )
}

SearchStructure.propTypes = {
    path: PropTypes.string.isRequired,
    templateName: PropTypes.string.isRequired

};

export default SearchStructure;


