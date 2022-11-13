import React from 'react';
import {DefaultImage, getImageURI, JahiaCtx, useNode} from '@jahia/nextjs-sdk';
import Image from 'next/image';

export function Optimizer({id, width, height, ...props}) {
    const {workspace, isPreview, isEditMode} = React.useContext(JahiaCtx);
    const {data, error, loading} = useNode(id, ['j:width', 'j:height'], true);

    if (loading) {
        return 'loading';
    }

    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>;
    }

    const {path, name} = data;

    if (workspace !== 'LIVE' && isEditMode) {
        return (
            <DefaultImage
                {...props}
                path={path}
                alt={name}
            />
        );
    }

    if (workspace === 'LIVE' || isPreview) {
        let w = width;
        let h = height;

        if (data.properties) {
            if (!Number.isNaN(Number.parseInt(data.properties['j:width'], 10))) {
                w = Number.parseInt(data.properties['j:width'], 10);
            }

            if (!Number.isNaN(Number.parseInt(data.properties['j:height'], 10))) {
                h = Number.parseInt(data.properties['j:height'], 10);
            }
        }

        return (
            <Image
                {...props}
                unoptimized={isPreview}
                src={process.env.NEXT_PUBLIC_JAHIA_BASE_URL + getImageURI({uri: path, workspace})}
                alt={name}
                layout="responsive"
                // Layout="fill"
                width={w}
                height={h}
                objectFit="cover"
            />
        );
    }

    return null;
}
