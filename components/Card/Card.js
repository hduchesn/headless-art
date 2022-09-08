import React from 'react';
import {JahiaCtx, useNode, DefaultImage, EmbeddedPathInHtmlResolver} from '@jahia/nextjs-sdk';
import * as PropTypes from 'prop-types';
import {LinkTo, linkToProperties} from '../LinkTo';

// Note:  use xss to clean body
export function Card({id}) {
    const {locale} = React.useContext(JahiaCtx);

    const {data, error, loading} = useNode(id, [...linkToProperties, 'body', 'mediaNode']);

    if (loading) {
        return 'loading';
    }

    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>;
    }

    const {name, path, properties: {body, mediaNode}} = data;

    return (
        <div className="media d-block media-custom text-center">
            <LinkTo content={{...data.properties, path}} locale={locale} fallback={{elt: 'div', css: ['cardALike']}}>
                {mediaNode && <DefaultImage
                    path={mediaNode.path}
                    className="img-fluid"
                    alt={name}/>}
            </LinkTo>
            <EmbeddedPathInHtmlResolver htmlAsString={body || 'no body'}/>
        </div>
    );
}

Card.propTypes = {
    id: PropTypes.string.isRequired,
};
// Export default Card;
