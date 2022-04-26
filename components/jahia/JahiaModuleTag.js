import React, {useEffect, useRef, useState} from 'react';
import * as PropTypes from "prop-types";
import {generateUUID} from "@jahia/nextjs-lib";

function JahiaModuleTag({path, type, nodetypes, listlimit, showareabutton, referencetypes, allowreferences, children}) {
    const [uuid, setUuid] = useState('-');

    useEffect(() => {
        setUuid(generateUUID())
    }, [setUuid]);

    const divElt = {
        className: 'jahia-template-gxt',
        jahiatype: 'module',
        id: `module${uuid.current}`,
        showareabutton,
        path,
        type,
        nodetypes,
        listlimit,
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
    listlimit:PropTypes.number,
    showareabutton: PropTypes.string,
    allowreferences: PropTypes.string,
    referencetypes: PropTypes.string,
    children: PropTypes.node,
};

JahiaModuleTag.defaultProps = {
    type: 'existingNode',
    nodetypes: '',
    showareabutton: 'false',
    allowreferences: 'false',
    referencetypes: ''
}

export default JahiaModuleTag
