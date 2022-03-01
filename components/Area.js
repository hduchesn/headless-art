import {gql, useQuery} from "@apollo/client";
import Head from "next/head"
import {useContext} from "react";
import {JahiaCtx} from "../lib/context";

const Area = ({name, mainResourcePath, path}) => {
    const {workspace} = useContext(JahiaCtx)
    const getRenderedContent = gql`query ($mainResourcePath: String, $path: String, $language: String, $node: InputJCRNode, $isEditMode: Boolean) {
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
    }`

    // const getRenderedContent = gql`query($workspace: Workspace!, $path: String!, $mainResourcePath: String) {
    //     jcr(workspace: $workspace) {
    //         nodeByPath(path: $path) {
    //             renderedContent(mainResourcePath: $mainResourcePath, isEditMode:true) {
    //                 output
    //                 css: staticAssets(type: "css") {
    //                     key
    //                 }
    //                 javascript: staticAssets(type: "javascript") {
    //                     key
    //                 }
    //             }
    //         }
    //     }
    // }`;

    const area = useQuery(getRenderedContent, {
        variables: {
            node: {
                name,
                primaryNodeType: "jnt:area"
            },
            language: "en",
            path:"/",
            mainResourcePath,
            isEditMode: true
        }
    })
    console.log("[Area] area :",area);
    console.log("[Area] output :",area?.data?.npm?.renderedComponent?.output);
    return (
        <>
            {/*<Head>*/}
            {/*{area.data && area.data.jcr.nodeByPath.renderedContent.css && area.data.jcr.nodeByPath.renderedContent.css.map(s => (*/}
            {/*    <link key={s.key} href={'http://localhost:8080' + s.key} rel="stylesheet" />*/}
            {/*))}*/}
            {/*</Head>*/}

            <div dangerouslySetInnerHTML={{__html: area.data && area.data.npm.renderedComponent.output}}/>
        </>
    )
}

export default Area
