import React from 'react';
import * as PropTypes from "prop-types";
import {generateUUID} from "./utils";

function PlaceholderNode({path, nodetypes, children}) {
// console.log("[PlaceholderNode] children : ",children);
    const divElt = {
        class: 'jahia-template-gxt',
        jahiatype: 'module',
        id: `module${generateUUID()}`,
        type: 'existingNode',
        // scriptinfo:"Path dispatch: /modules/industrial/2.1.2/tint_text/html/text.jsp",
        path,
        showareabutton: 'true',
        allowreferences: "false",
        nodetypes
    }


    return (
        <div {...divElt}>
            {children}
        </div>
    )
}
PlaceholderNode.propTypes = {
    path : PropTypes.string.isRequired,
    nodetypes: PropTypes.string, //should be an array ?
    children: PropTypes.object.isRequired,
};
export default PlaceholderNode
