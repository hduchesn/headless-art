import React from 'react';
import {DefaultImage, getImageURI, JahiaCtx} from '@jahia/nextjs-sdk';
import Image from 'next/image';

export function Optimizer({mediaNode, width, height, ...props}) {
    const {workspace, isPreview, isEditMode} = React.useContext(JahiaCtx);

    if (mediaNode && (workspace !== 'LIVE' && isEditMode)) {
        return (
            <DefaultImage
                path={mediaNode.path}
                alt={mediaNode.name}
                {...props}
            />
        );
    }

    if (mediaNode && (workspace === 'LIVE' || isPreview)) {
        return (
            <Image
                unoptimized={isPreview}
                src={process.env.NEXT_PUBLIC_JAHIA_BASE_URL + getImageURI({uri: mediaNode.path, workspace})}
                alt={mediaNode.name}
                {...props}
                layout="responsive"
                // Layout="fill"
                width={width}
                height={height}
                objectFit="cover"
            />
        );
    }

    return null;
}
