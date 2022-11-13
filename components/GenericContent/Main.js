import React from 'react';
import {useNode, EmbeddedPathInHtmlResolver} from '@jahia/nextjs-sdk';
import {Container, Row, Col} from 'react-bootstrap';
import * as PropTypes from 'prop-types';
import {Optimizer} from '../images';

// Import classNames from 'classnames';

export function Main({id}) {
    const {data, error, loading} = useNode(id, ['body', 'mediaNodeFocus']);

    if (loading) {
        return 'loading';
    }

    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>;
    }

    const {body, mediaNodeFocus} = data.properties;

    return (
        <section className="section">
            <Container>
                <Row className="align-items-center mb-5">
                    <Col lg={6} className="order-md-2">
                        <div className="scaling-image">
                            <div className="frame">
                                <Optimizer id={mediaNodeFocus.uuid} width={8} height={9} className="img-fluid"/>
                            </div>
                        </div>
                    </Col>
                    <Col md={6} className="pr-md-5 mb-5">
                        <EmbeddedPathInHtmlResolver htmlAsString={body || 'no text'}/>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

Main.propTypes = {
    id: PropTypes.string.isRequired,
};
