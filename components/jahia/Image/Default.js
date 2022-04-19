import React from "react";
import {JahiaCtx} from "../../../lib/context";
import {getImageURI} from "../utils";
import * as PropTypes from "prop-types";


function DefaultImage({path,alt,className}) {
    const {workspace} = React.useContext(JahiaCtx);

    return (
        <img
            src={getImageURI({uri: path, workspace})}
            alt={alt}
            className={className}/>
    )
}

DefaultImage.propTypes = {
    path: PropTypes.string.isRequired,
    alt: PropTypes.string,
    className: PropTypes.string,
};

DefaultImage.defaultProps = {
    className:"img-fluid",
    alt:"this is an image"
}

export default DefaultImage;
