import React, {useMemo} from "react";
import {gql, useQuery} from "@apollo/client";
import {getJahiaDivsProps} from "../../lib/utils";
import {JahiaCtx, MainResourceCtx} from "../../lib/context";
import * as PropTypes from "prop-types";
import {JahiaComponent} from "components/jahia/JahiaComponent";

function Area({name, allowedTypes}) {
    const {workspace, isEditMode, locale} = React.useContext(JahiaCtx);
    const mainResourcePath = React.useContext(MainResourceCtx);
    const getRenderedContent = gql`query (
        $workspace:Workspace!,
        $pathArea: String!,
        $mainResourcePath: String,
        $path: String,
        $language: String,
        $node: InputJCRNode,
        $isEditMode: Boolean!) {
        # npm is used to create jahia area if needed and return jahia HTML tags for the edit mode       
        npm @include(if: $isEditMode) {
            renderedComponent(
                mainResourcePath:$mainResourcePath,
                path: $path,
                language: $language,
                view: "default",
                templateType: "html",
                node: $node,
                isEditMode: $isEditMode) {
                id
                output
            }
        }
        jcr(workspace:$workspace) {
            workspace
            nodeByPath(path:$pathArea) {
                workspace
                uuid
                name
                path
                children{
                    nodes{
                        workspace
                        uuid
                        path
                        primaryNodeType{name}
                    }
                }
            }
        }
    }`;

    const nodeProps = {
        name,
        primaryNodeType: "jnt:area",
    };
    //TODO add number of item limit too
    if (Array.isArray(allowedTypes) && allowedTypes.length > 0) {
        nodeProps.properties = [{name: "j:allowedTypes", values: allowedTypes}];
    }

    // const area = useQuery(getRenderedContent, {
    const {data, error, loading} = useQuery(getRenderedContent, {
        variables: {
            workspace,
            pathArea: `${mainResourcePath}/${name}`,
            node: {...nodeProps},
            language: {locale},
            mainResourcePath,
            isEditMode
        }
    })

    const area = data?.jcr?.nodeByPath;
    const divs = useMemo(() => isEditMode && !loading && getJahiaDivsProps(data?.npm?.renderedComponent?.output), [data, isEditMode, loading]);

    if (loading) {
        return "loading";
    }
    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>
    }

    return (
        <>
            {isEditMode &&
                <div {...divs[area.path]}>
                    {area?.children.nodes.map(node => <JahiaComponent key={node.uuid} node={node}/>)}

                    {/*Jahia btn placeholder*/}
                    <div {...divs["*"]}/>
                </div>}
            {!isEditMode && area?.children.nodes.map(node => <JahiaComponent key={node.uuid} node={node}/>)}
        </>

    )

}

Area.propTypes = {
    name: PropTypes.string.isRequired,
    allowedTypes: PropTypes.array,
};

export default Area;
