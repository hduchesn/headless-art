import {gql, useQuery} from "@apollo/client";
import Head from "next/head"
import {useContext} from "react";
import {JahiaCtx} from "../lib/context";

const Area = ({mainResourcePath, path}) => {
    const {workspace} = useContext(JahiaCtx)
    const getRenderedContent = gql`query($workspace: Workspace!, $path: String!, $mainResourcePath: String) {
        jcr(workspace: $workspace) {
            nodeByPath(path: $path) {
                renderedContent(mainResourcePath: $mainResourcePath, isEditMode:true) {
                    output
                    css: staticAssets(type: "css") {
                        key
                    }
                    javascript: staticAssets(type: "javascript") {
                        key
                    } 
                }
            }
        }
    }`;

    const ret = useQuery(getRenderedContent, {variables: {path, mainResourcePath, workspace}})
    return (
        <>
            <Head>
            {ret.data && ret.data.jcr.nodeByPath.renderedContent.css && ret.data.jcr.nodeByPath.renderedContent.css.map(s => (
                <link key={s.key} href={'http://localhost:8080' + s.key} rel="stylesheet" />
            ))}
            </Head>

            <div dangerouslySetInnerHTML={{__html: ret.data && ret.data.jcr.nodeByPath.renderedContent.output}}/>
        </>
    )
}

export default Area
