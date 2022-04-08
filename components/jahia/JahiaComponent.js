import React from "react";
import components from "../index";
import propTypes from 'prop-types';
import {JahiaCtx} from "../../lib/context";
import {generateUUID} from "./utils";

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
