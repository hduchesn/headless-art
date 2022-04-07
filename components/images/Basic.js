import React from "react";
import {JahiaCtx} from "../../lib/context";
import {getImageURI} from "../../lib/utils";
import * as PropTypes from "prop-types";


function BasicImage({imageNode}) {
    const {workspace} = React.useContext(JahiaCtx);

    return (
        <img
            src={getImageURI({uri: imageNode.media?.refNode?.path, workspace})}
            alt="Free template by Free-Template.co"
            className="img-fluid"/>
    )
}

BasicImage.propTypes = {
    imageNode: PropTypes.object.isRequired
};

export default BasicImage;
