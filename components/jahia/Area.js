import React, {useMemo} from "react";
import {gql, useQuery} from "@apollo/client";
import {getJahiaDivsProps} from "../../lib/utils";
import {JahiaCtx} from "../../lib/context";
import * as PropTypes from "prop-types";
import components from "../index";

function Area({name, mainResourcePath, allowedTypes}) {
    const {workspace, isEditMode, locale} = React.useContext(JahiaCtx);

    const getRenderedContent = gql`query (
        $workspace:Workspace!,
        $pathArea: String!,
        $mainResourcePath: String,
        $path: String,
        $language: String,
        $node: InputJCRNode,
        $isEditMode: Boolean) {
        # npm is used to create jahia area if needed and return jahia HTML tags for the edit mode       
        npm {
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
        nodeProps.properties = [{name: "j:allowedTypes", value: allowedTypes}];
    }

    // const area = useQuery(getRenderedContent, {
    const {data, error, loading} = useQuery(getRenderedContent, {
        variables: {
            workspace,
            pathArea: `${mainResourcePath}/${name}`,
            node: {...nodeProps},
            language: "en",
            mainResourcePath,
            isEditMode
        }
    })

    const area = data?.jcr?.nodeByPath;
    const divs = useMemo(() => isEditMode && !loading && getJahiaDivsProps(data.npm?.renderedComponent?.output), [data, isEditMode, loading]);

    if (loading) {
        return "loading";
    }
    if (error) {
        return <div>{error}</div>;
    }

    const showChildren = () => {
        return area?.children.nodes.map(node => {
            if (components[node.primaryNodeType.name]) {
                const Component = components[node.primaryNodeType.name];

                if (isEditMode) {
                    return (
                        <div key={node.uuid} {...divs[node.path]}>
                            <Component
                                id={node.uuid}
                                path={node.path}
                                mainResourcePath={mainResourcePath}/>
                        </div>
                    )
                }

                return (
                    <Component
                        key={node.uuid}
                        id={node.uuid}
                        path={node.path}
                        mainResourcePath={mainResourcePath}/>
                )
            }
            return (
                <div key={node.uuid}>Unknown rendering for : {node.name} - {node.primaryNodeType.name}</div>
            )
        });
    }

    return (
        <>
            {isEditMode &&
                <div {...divs[area.path]}>
                    {showChildren()}

                    {/*Jahia btn placeholder*/}
                    <div {...divs["*"]}/>
                </div>}
            {!isEditMode &&
                showChildren()}
        </>

    )

}

Area.propTypes = {
    name: PropTypes.string.isRequired,
    mainResourcePath: PropTypes.string.isRequired,
    allowedTypes: PropTypes.array,
};

export default Area;
