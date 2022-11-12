import React from 'react';
import {JahiaCtx, useNode} from '@jahia/nextjs-sdk';
import * as PropTypes from 'prop-types';
import {LinkTo} from '../LinkTo';
import {Optimizer} from '../images';

export function Card({id}) {
    const {locale} = React.useContext(JahiaCtx);

    const {data, error, loading} = useNode(id, ['mediaNodeFocus', 'jcr:title']);

    if (loading) {
        return 'loading';
    }

    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>;
    }

    const {path, properties: {mediaNodeFocus: mediaNode, 'jcr:title': title}} = data;

    return (
        <div className="media d-block media-custom text-center">
            <LinkTo content={{linkType: 'self', linkTarget: '_self', path}} locale={locale} fallback={{elt: 'div', css: ['cardALike']}}>
                {mediaNode && <Optimizer mediaNode={mediaNode} width={10} height={10} className="img-fluid"/>}
            </LinkTo>
            <div className="media-body">
                <h3 className="mt-0 text-black"> {title || 'no body'}</h3>
            </div>
        </div>
    );
}

Card.propTypes = {
    id: PropTypes.string.isRequired,
};
