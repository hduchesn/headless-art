import React from 'react';
import {JahiaCtx, useNode, getImageURI, EmbeddedPathInHtmlResolver} from '@jahia/nextjs-sdk';
import * as PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Animate, animateProperties, getAnimateProps} from '@jahia/nextjs-community-components';

// Note: use xss to clean body
export function Hero({id, isTitleUsed}) {
    const {workspace} = React.useContext(JahiaCtx);

    const {data, error, loading} = useNode(id, [...animateProperties, 'teaser', 'mediaNode', 'jcr:title']);

    if (loading) {
        return 'loading';
    }

    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>;
    }

    const {properties: {teaser, mediaNode, 'jcr:title': title}} = data;
    const uri = getImageURI({uri: mediaNode?.path, workspace});
    const body = isTitleUsed || !teaser ? `<h1><span>${title}</span></h1>` : teaser;

    return (
        <div className="inner-page">
            <div
                className="slider-item"
                style={{backgroundImage: `url('${uri}')`}}
            >
                <Container>
                    <Row className="slider-text align-items-center justify-content-center">
                        <Col
                            sm={12}
                            md={8}
                            className="text-center pt-5"
                        >
                            <Animate properties={getAnimateProps(data.properties)}>
                                <EmbeddedPathInHtmlResolver htmlAsString={body || 'no body'}/>
                            </Animate>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

Hero.propTypes = {
    id: PropTypes.string.isRequired,
    isTitleUsed: PropTypes.bool,
};
