import React from 'react';
import {DefaultImage} from '@jahia/nextjs-sdk';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export function Scaling({path, alt, className}) {
    return (
        <div className="scaling-image">
            <div className="frame">
                <DefaultImage
                    path={path}
                    alt={alt}
                    className={classNames('img-fluid', className)}
                />
            </div>
        </div>
    );
}

Scaling.propTypes = {
    path: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
};

Scaling.defaultProps = {
    alt: 'this is a scaling image',
};
