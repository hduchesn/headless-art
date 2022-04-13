import React from 'react';
import * as PropTypes from "prop-types";
import {generateUUID} from "./utils";

function JahiaModuleTag({path, type, nodetypes, referencetypes, allowreferences, children}) {
    const divElt = {
        class: 'jahia-template-gxt',
        jahiatype: 'module',
        id: `module${generateUUID()}`,
        showareabutton: 'true',
        path,
        type,
        nodetypes,
        allowreferences,
        referencetypes,
    }

    return (
        <div {...divElt}>
            {children}
        </div>
    )
}

JahiaModuleTag.propTypes = {
    path: PropTypes.string.isRequired,
    type: PropTypes.string,
    nodetypes: PropTypes.string,
    allowreferences: PropTypes.string,
    referencetypes: PropTypes.string,
    children: PropTypes.object,
};

JahiaModuleTag.defaultProps = {
    type: 'existingNode',
    nodetypes: '',
    allowreferences: 'false',
    referencetypes: ''
}

export default JahiaModuleTag
