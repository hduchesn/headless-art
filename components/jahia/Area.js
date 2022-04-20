import React from "react";
import {gql, useQuery} from "@apollo/client";
import {JahiaCtx, MainResourceCtx} from "../../lib/context";
import * as PropTypes from "prop-types";
import {JahiaComponent} from "./JahiaComponent";
import { CORE_NODE_FIELDS } from './GQL/fragments';

function Area({name, /*allowedTypes,*/tagProps, componentProps}) {
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
                ...CoreNodeFields
                nodetypes: property(name:"j:contributeTypes"){ values }
                listlimit: property(name:"limit"){ value:longValue }
                mixinTypes {
                    name
                }
            }
        }
    }
    ${CORE_NODE_FIELDS}`;

    const nodeProps = {
        name,
        primaryNodeType: "jnt:area",
    };

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

    if (loading) {
        return "loading";
    }
    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>
    }

    const dataTagProps={
        nodetypes:data.jcr.nodeByPath.nodetypes?.values,
        listlimit:data.jcr.nodeByPath.listlimit?.value
    }
    //cleaning
    Object.keys(dataTagProps).forEach(key => {
        if (dataTagProps[key] === undefined) {
            delete dataTagProps[key];
        }
    });

    let joinTagProps=Object.assign({
        nodetypes : ["jmix:droppableContent"]
    },tagProps,dataTagProps)

    joinTagProps={
        ...joinTagProps,
        nodetypes:joinTagProps.nodetypes.join(" ")
    }

    return (
        <JahiaComponent
            node={data.jcr.nodeByPath}
            componentProps={{childComponentProps:componentProps}}
            tagProps={{
                ...joinTagProps,
                type:"area",
                // nodetypes,
                //todo get this dynamically
                referencetypes: "jnt:fileReference[jnt:file] jnt:fileI18nReference[jnt:file] jnt:contentReference[jmix:droppableContent] jnt:contentFolderReference[jnt:contentFolder] jnt:portletReference[jnt:portlet] jnt:imageReferenceLink[jmix:image] jnt:imageReference[jmix:image] jnt:nodeLinkImageReference[jmix:image] jnt:nodeLinkI18nImageReference[jmix:image] jnt:externalLinkImageReference[jmix:image] jnt:externalLinkI18nImageReference[jmix:image] jnt:imageI18nReference[jmix:image] wdennt:widenReference[wdenmix:widenAsset]",
                allowreferences: "true",
            }}
        />
    )

}

Area.propTypes = {
    name: PropTypes.string.isRequired,
    // allowedTypes: PropTypes.array,
    tagProps:PropTypes.object,
    componentProps: PropTypes.object
};

export default Area;
