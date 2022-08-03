import React from 'react';
import {useNode, DefaultImage} from '@jahia/nextjs-sdk';
import {Container,Row,Col} from 'react-bootstrap'
import * as PropTypes from 'prop-types';
import classNames from "classnames";

export function Main({id}) {
    const {data, error, loading} = useNode(id, ['body','mediaNodeFocus']);

    if (loading) {
        return 'loading';
    }

    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>;
    }

    const {name, properties: {body,mediaNodeFocus}} = data;

    return (
        <section className="section">
            <Container>
                <Row className="align-items-center mb-5">
                    <Col lg={7} className="order-md-2">
                        <div className="scaling-image">
                            <div className="frame">
                                <DefaultImage
                                    path={mediaNodeFocus.path}
                                    className={"img-fluid"}
                                    alt={mediaNodeFocus.name}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={5} className="pr-md-5 mb-5">
                        <div dangerouslySetInnerHTML={{__html: body || name}} />
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

Main.propTypes = {
    id: PropTypes.string.isRequired,
};
