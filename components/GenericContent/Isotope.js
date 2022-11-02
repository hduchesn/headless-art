import React from 'react';
import {JahiaCtx, useNode, DefaultImage, getImageURI} from '@jahia/nextjs-sdk';
import * as PropTypes from 'prop-types';
import {LinkTo} from '../LinkTo';
import styles from './isotope.module.css';
import Image from 'next/image';

export function Isotope({id}) {
    const {workspace, locale, isPreview, isEditMode} = React.useContext(JahiaCtx);

    const {data, error, loading} = useNode(id, ['mediaNodeFocus']);

    if (loading) {
        return 'loading';
    }

    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>;
    }

    const {path, properties: {mediaNodeFocus: mediaNode}} = data;

    const getImageComponent = () => {
        if (mediaNode && (workspace !== 'LIVE' && isEditMode)) {
            return (
                <DefaultImage
                    path={mediaNode.path}
                    alt={mediaNode.name}
                />
            );
        }

        if (mediaNode && (workspace === 'LIVE' || isPreview)) {
            return (
                <Image
                    unoptimized={isPreview}
                    src={process.env.NEXT_PUBLIC_JAHIA_BASE_URL + getImageURI({uri: mediaNode.path, workspace})}
                    alt={mediaNode.name}
                    // Layout="fill"
                    objectFit="cover"
                    width={600}
                    height={600}
                />
            );
        }

        return null;
    };

    return (
        <div className={styles.singlePortfolioContent} style={{position: 'relative'}}>
            {getImageComponent()}
            <div className={styles.hoverContent}>
                <LinkTo content={{linkType: 'self', linkTarget: '_self', path}} locale={locale} className="portfolio-img">
                    +
                </LinkTo>
            </div>
        </div>
    );
}

Isotope.propTypes = {
    id: PropTypes.string.isRequired,
};
