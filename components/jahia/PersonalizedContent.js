import React from 'react';
import {JahiaCtx} from "../../lib/context";
import {gql, useQuery} from "@apollo/client";
import components from "../index";
import * as PropTypes from "prop-types";
import {JahiaComponent} from "components/jahia/JahiaComponent";

export function PersonalizedContent({id}) {
    const {workspace, locale, isEditMode} = React.useContext(JahiaCtx);
    const [content, setContent] = React.useState({})
    const getContent = gql`query($workspace: Workspace!, $id: String!){
        jcr(workspace: $workspace) {
            workspace
            nodeById(uuid: $id) {
                workspace
                uuid
                name
                property(name: "wem:controlVariant") {
                    value
                }
                children {
                    nodes {
                        workspace
                        uuid
                        path
                        name
                        primaryNodeType {
                            name
                        }
                    }
                }
            }
        }
    }`;

    const {data, loading, error} = useQuery(getContent, {
        variables: {
            workspace,
            id
        }
    });

    return isEditMode ? (
        <div>
            Personalized content - edition

            {data && data.jcr.nodeById.children.nodes.map(node => <JahiaComponent node={node}/>)}
        </div>
    ) : (
        <div>
            Personalized content - live

            {data && data.jcr.nodeById.children.nodes.map(node => {
                return (
                    <div style={{display:"none"}}>
                        <JahiaComponent node={node}/>
                    </div>
                );
            })}
        </div>

    );
}

PersonalizedContent.propTypes = {
    id : PropTypes.string.isRequired,
}

