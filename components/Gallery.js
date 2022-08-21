import React from 'react';
import {JahiaCtx, useNode, DefaultImage} from '@jahia/nextjs-sdk';
import * as PropTypes from 'prop-types';
import {PlusLg} from 'react-bootstrap-icons';
import {LinkTo, linkToProperties} from './LinkTo';

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

    const {name, path, properties: {heading, mediaNode}} = data;

    return (
        <LinkTo content={{...data.properties, path}} locale={locale} className="link-thumbnail" fallback={{elt: 'div', className: 'link-thumbnail'}}>
            <h3>{heading}</h3>
            <PlusLg className="icon"/>
            {mediaNode && <DefaultImage
                path={mediaNode.path}
                className="img-fluid"
                alt={name}/>}
        </LinkTo>
    );
}

Gallery.propTypes = {
    id: PropTypes.string.isRequired,
};
export default Gallery;
