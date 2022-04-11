import React from "react";
import {JahiaCtx} from "../lib/context";
import {gql, useQuery} from "@apollo/client";
import {getImageURI} from "../lib/utils";
import * as PropTypes from "prop-types";

//TODO use xss to clean body

function Hero({id}) {
    const {workspace, locale} = React.useContext(JahiaCtx);

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

    const {data, error, loading} = useQuery(getContent, {
        variables: {
            workspace,
            id,
            language: locale,
        }
    });

    const content={
        body: data?.jcr?.nodeById?.body?.value || 'no body',
        mediaNode: data?.jcr?.nodeById?.media?.node
    }

    if (loading) {
        return "loading";
    }
    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>
    }

    // console.log("[Hero] is resolved");
    //element-animate
    //     <div className="slider-item" style={{backgroundImage: `url('/files/default${getImageURI(content.media?.path)}')`}}>
    //     <div className="slider-item" style={{backgroundImage:   `url('/files/default${encodeURI(content.media?.path)}')`}}>
    return (

        <div className="inner-page">
            <div
                className="slider-item"
                style={{backgroundImage: `url('${getImageURI({uri: content.mediaNode?.path, workspace})}')`}}
            >
                <div className="container">
                    <div className="row slider-text align-items-center justify-content-center">
                        <div
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{__html: content.body}}
                            className="col-md-8 text-center col-sm-12  pt-5"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

Hero.propTypes = {
    id: PropTypes.string.isRequired
};
export default Hero;
