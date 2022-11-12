import React from 'react';
import {JahiaCtx, useNode} from '@jahia/nextjs-sdk';
import * as PropTypes from 'prop-types';
import {LinkTo} from '../LinkTo';
import styles from './isotope.module.css';
import {Optimizer} from '../images';

export function Isotope({id}) {
    const {locale} = React.useContext(JahiaCtx);

    const {data, error, loading} = useNode(id, ['mediaNodeFocus'], true);

    if (loading) {
        return 'loading';
    }

    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>;
    }

    const {path, properties: {mediaNodeFocus: mediaNode}} = data;

    return (
        <div className={styles.singlePortfolioContent} style={{position: 'relative'}}>
            <Optimizer mediaNode={mediaNode} width={10} height={10}/>
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
