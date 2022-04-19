import React from 'react';
import {JahiaCtx} from "../../lib/context";
import classNames from "classnames";
import styles from "./halfBlock.module.css";
import * as PropTypes from "prop-types";
import {getImageURI} from "../jahia/utils";

function Image({imageNode}) {
    const {workspace} = React.useContext(JahiaCtx);

    return (
        <div
            className={classNames("image-display", styles.image)}
            style={{backgroundImage: `url('${getImageURI({uri: imageNode.media?.refNode?.path, workspace})}')`}}
        />
    )
}

Image.propTypes = {
    imageNode: PropTypes.object.isRequired
};

export default Image;
