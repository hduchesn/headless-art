import React, {useContext} from "react";
import {JahiaCtx} from "../../lib/context";
import {gql, useQuery} from "@apollo/client";

//TODO use xss to clean content

function RichText({id}) {
    const {workspace, locale} = useContext(JahiaCtx);
    const [content, setContent] = React.useState("")

    //todo manage view ?
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
        onCompleted: data => setContent(data.jcr?.nodeById?.content?.value || "no text")
    });
    // console.log("[RichText] is resolved");
    // const content= "<h3>Hello le text</h3>"
    return (
        <div dangerouslySetInnerHTML={{__html: content}}/>
    )
}

export default RichText
