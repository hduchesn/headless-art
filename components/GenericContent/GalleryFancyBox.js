import React from 'react';
import {JahiaCtx, useNode, getImageURI} from '@jahia/nextjs-sdk';
import * as PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import {Fancybox} from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox.css';
import {Col, Container, Row} from 'react-bootstrap';
import styles from './galleryFancyBox.module.css';
import classNames from 'classnames';
import {Optimizer} from '../images';

export function GalleryFancyBox({id}) {
    const {workspace} = React.useContext(JahiaCtx);
    const {data, error, loading} = useNode(id, ['mediaGallery']);

    if (loading) {
        return 'loading';
    }

    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>;
    }

    const {properties: {mediaGallery}} = data;

    if (!mediaGallery) {
        return null;
    }

    return (
        <section className="section bg-light">
            <Container>
                <Row className="justify-content-center mb-5">
                    <Col md={8} className="text-center">
                        <h2 className="heading">Gallery</h2>
                    </Col>
                </Row>
                <Row>
                    {mediaGallery.map(item => (
                        <Col key={item.uuid} xs={4} md={3} lg={2} className={classNames('mb-3', styles.fancyBoxContainer)}>
                            <a className={styles.fancyBoxLink} data-fancybox="gallery" data-src={getImageURI({uri: item.path, workspace})}>
                                <Optimizer mediaNode={item} width={10} height={10}/>
                            </a>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
}

GalleryFancyBox.propTypes = {
    id: PropTypes.string.isRequired,
};
