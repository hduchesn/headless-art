import React from "react";
import {JahiaCtx} from "../lib/context";
import {gql, useQuery} from "@apollo/client";
import {getImageURI} from "../lib/utils";

//TODO use xss to clean body

function Hero({id}) {
    const {workspace, locale} = React.useContext(JahiaCtx);
    const [content, setContent] = React.useState({})
    const getContent = gql`query($workspace: Workspace!, $id: String!,$language:String!){
        jcr(workspace: $workspace) {
            workspace
            nodeById(uuid: $id) {
                workspace
                uuid
                name
                body: property(language:$language, name:"body"){
                    value
                }
                media: property(language:$language,name:"wden:mediaNode",){
                    node: refNode {
                        workspace
                        uuid
                        type: primaryNodeType{
                            value:name
                        }
                        mixins: mixinTypes{
                            value:name
                        }
                        path
                    }
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
        onCompleted: data => setContent({
            body: data.jcr?.nodeById?.body?.value || 'no body',
            media: data.jcr?.nodeById?.media?.node
        })
    });

    // console.log("[Hero] is resolved");
    //element-animate
    //     <div className="slider-item" style={{backgroundImage: `url('/files/default${getImageURI(content.media?.path)}')`}}>
    //     <div className="slider-item" style={{backgroundImage:   `url('/files/default${encodeURI(content.media?.path)}')`}}>
    return (

        <div className="inner-page">
            {content &&
                <div
className="slider-item"
style={{backgroundImage: `url('${getImageURI({uri: content.media?.path, workspace})}')`}}
                >
                    <div className="container">
                        <div className="row slider-text align-items-center justify-content-center">
                            <div
                                dangerouslySetInnerHTML={{__html: content.body}}
                                className="col-md-8 text-center col-sm-12  pt-5"
                            />
                        </div>
                    </div>
                </div>}
        </div>
    )
}

export default Hero;
