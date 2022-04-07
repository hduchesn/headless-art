import React from 'react';
import * as PropTypes from "prop-types";
import {generateUUID} from "./utils";

function PlaceholderBtn({path, nodetypes}) {

    const divElt = {
        class: 'jahia-template-gxt',
        jahiatype: 'module',
        id: `module${generateUUID()}`,
        type: 'placeholder',
        path,
        showAreaButton: 'true',
        nodetypes
    }


    return (
        <div {...divElt}/>
    )
}

PlaceholderBtn.propTypes = {
    path : PropTypes.string.isRequired,
    nodetypes: PropTypes.string //should be an array ?
};

export default PlaceholderBtn
