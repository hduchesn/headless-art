import React from "react";
import {useContext} from "react";
import {JahiaCtx} from "../../lib/context";
import {gql, useQuery} from "@apollo/client";


const RichText = ({id,path, locale}) => {
    const {workspace} = useContext(JahiaCtx);
    const [content,setContent] = React.useState("")
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

    const getContent = gql`query($workspace: Workspace!, $id: String!,$language:String!){
        jcr(workspace: $workspace) {
            workspace
            nodeById(uuid: $id) {
                workspace
                uuid
                name
                content: property(language:$language, name:"text"){
                    value
                }
            }
        }
    }`;

    useQuery(getContent, {
        variables: {
            workspace,
            id,
            language: locale,
        },
        onCompleted: data => setContent(data.jcr?.nodeById?.content.value)
    });

    // const content= "<h3>Hello le text</h3>"
    return (
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
    )
}
export default RichText
