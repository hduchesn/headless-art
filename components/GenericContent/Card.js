import React from 'react';
import {JahiaCtx, useNode, DefaultImage} from '@jahia/nextjs-sdk';
import * as PropTypes from 'prop-types';
import {LinkTo} from '../LinkTo';

export function Card({id}) {
    const {locale} = React.useContext(JahiaCtx);

    const {data, error, loading} = useNode(id, ['mediaNodeFocus']);

    if (loading) {
        return 'loading';
    }

    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>;
    }

    const {name, path, properties: {mediaNodeFocus : mediaNode}} = data;

    return (
        <div className="media d-block media-custom text-center">
            <LinkTo content={{linkType:'self',linkTarget:"_self", path}} locale={locale} fallback={{elt: 'div', css: ['cardALike']}}>
                {mediaNode && <DefaultImage
                    path={mediaNode.path}
                    className="img-fluid"
                    alt={mediaNode.name}/>}
            </LinkTo>
            <div className="media-body">
                <h3 className="mt-0 text-black"> {name || 'no body'}</h3>
            </div>
        </div>
    );
}

Card.propTypes = {
    id: PropTypes.string.isRequired,
};
