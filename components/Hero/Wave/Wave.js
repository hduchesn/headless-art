import React from 'react';
import {EmbeddedPathInHtmlResolver,useNode} from '@jahia/nextjs-sdk';
import {Animate, animateProperties, getAnimateProps,WaveBlue, WaveDark} from '@jahia/nextjs-community-components';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from './wave.module.css';
import classNames from 'classnames';
import * as PropTypes from "prop-types";

export function Wave({id,wave}) {
    const {data, error, loading} = useNode(id, [...animateProperties, 'body', 'mediaNode']);

    if (loading) {
        return 'loading';
    }

    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>;
    }

    const {body, mediaNode} = data.properties;
    const WaveCmp = wave === "dark" ? WaveDark : WaveBlue;
    return (
        <div className={styles.banner}>
            {mediaNode &&
            <WaveCmp path={mediaNode.path} alt={mediaNode.name}/>
            }
            <Container className={classNames("text text-white",styles.content)}>
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
    );
}

Wave.propTypes = {
    id: PropTypes.string.isRequired,
    wave: PropTypes.string.isRequired,
};
