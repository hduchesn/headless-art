import React from 'react';
import {JahiaCtx, useNode} from '@jahia/nextjs-sdk';
import * as PropTypes from 'prop-types';
import {PlusLg} from 'react-bootstrap-icons';
import {LinkTo, linkToProperties} from './LinkTo';
import {Optimizer} from './images';

function Gallery({id}) {
    const {locale} = React.useContext(JahiaCtx);
    const {data, error, loading} = useNode(id, [...linkToProperties, 'heading', 'mediaNode']);

    if (loading) {
        return 'loading';
    }

    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>;
    }

    const {path, properties: {heading, mediaNode}} = data;

    return (
        <LinkTo content={{...data.properties, path}} locale={locale} className="link-thumbnail" fallback={{elt: 'div', className: 'link-thumbnail'}}>
            <h3>{heading}</h3>
            <PlusLg className="icon"/>
            {mediaNode && <Optimizer mediaNode={mediaNode} width={10} height={10} className="img-fluid"/>}
        </LinkTo>
    );
}

Gallery.propTypes = {
    id: PropTypes.string.isRequired,
};
export default Gallery;
