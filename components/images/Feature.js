import React from 'react';
import {JahiaCtx, DefaultImage, getImageURI} from '@jahia/nextjs-sdk';
import * as PropTypes from 'prop-types';

export function Feature({path, alt, className}) {
    const {workspace, isEditMode} = React.useContext(JahiaCtx);
    const imageUri = getImageURI({uri: path, workspace});
    // Console.log("[Feature] imageUri: ",imageUri);

    if (isEditMode) {
        return <DefaultImage path={path} alt={alt} className={className}/>;
    }

    return (
        <div className="scaling-image h-100">
            <div className="frame h-100">
                <div
                    className="feature-img-bg h-100"
                    style={{backgroundImage: `url('${imageUri}')`}}/>
            </div>
        </div>
    );
}

Feature.propTypes = {
    path: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
};

Feature.defaultProps = {
    alt: 'this is the feature image',
};

// Export default Feature;
