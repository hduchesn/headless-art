import React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import {Optimizer} from '../images';

export function Scaling({id, className}) {
    return (
        <div className="scaling-image">
            <div className="frame">
                <Optimizer id={id} width={8} height={9} className={classNames('img-fluid', className)}/>
            </div>
        </div>
    );
}

Scaling.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
};

// Scaling.defaultProps = {
//     alt: 'this is a scaling image',
// };
