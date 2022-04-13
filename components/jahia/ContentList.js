import React, {useContext} from 'react';
import {JahiaCtx} from "../../lib/context";
import * as PropTypes from "prop-types";
import {gql, useQuery} from "@apollo/client";
import {JahiaComponent} from "./JahiaComponent";
import JahiaModuleTag from "./JahiaModuleTag";

export function ContentList({id}) {
    const {workspace, isEditMode} = useContext(JahiaCtx);

    const getContent = gql`query($id:String!, $workspace:Workspace!) {
        jcr(workspace: $workspace) {
            workspace
            nodeById(uuid: $id) {
                uuid
                workspace
                path
                children {
                    nodes {
                        uuid
                        workspace
                        path
                        primaryNodeType {
                            name
                        }
                        mixinTypes {
                            name
                        }
                    }
                }
            }
        }
    }`

    const {data, error, loading} = useQuery(getContent, {
        variables: {
            workspace,
            id
        }
    });

    if (loading) {
        return "loading";
    }

    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>
    }

    return (
        <>
            {data.jcr.nodeById.children.nodes.map(node => <JahiaComponent key={node.uuid} node={node}/>)}

            {isEditMode && <JahiaModuleTag path="*" type="placeholder"/>}
        </>
    )
}

ContentList.propTypes = {
    id: PropTypes.string.isRequired,
}

