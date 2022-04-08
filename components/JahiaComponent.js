import React from "react";
import components from "./index";
import propTypes from 'prop-types';
import {JahiaCtx} from "../lib/context";

function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if (d > 0) {//Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

export function JahiaComponent({node}) {
    const {isEditMode} = React.useContext(JahiaCtx);

    if (components[node.primaryNodeType.name]) {
        const Component = components[node.primaryNodeType.name];

        if (isEditMode) {
            const divElt = {
                class: "jahia-template-gxt",
                jahiatype: "module",
                id: "module" + generateUUID(),
                type: "existingNode",
                path: node.path,
                showareabutton: "true"
            }

            return (
                <div {...divElt}>
                    <Component id={node.uuid} path={node.path}/>
                </div>
            )
        }

        return (
            <Component id={node.uuid} path={node.path}/>
        )
    }
    return (
        <div key={node.uuid}>Unknown rendering for : {node.name} - {node.primaryNodeType.name}</div>
    )
}

JahiaComponent.propTypes = {
    node: propTypes.object.isRequired
}
