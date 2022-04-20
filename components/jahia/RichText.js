import React, {useContext} from "react";
import {JahiaCtx} from "@jahia/nextjs-lib";
import {gql, useQuery} from "@apollo/client";
import * as PropTypes from "prop-types";
import { CORE_NODE_FIELDS } from './GQL/fragments';

//TODO use xss to clean content

function RichText({id}) {
    const {workspace, locale} = useContext(JahiaCtx);

    //todo manage view ?
    const getContent = gql`query($workspace: Workspace!, $id: String!,$language:String!){
        jcr(workspace: $workspace) {
            workspace
            nodeById(uuid: $id) {
                ...CoreNodeFields
                content: property(language:$language, name:"text"){ value }
            }
        }
    }
    ${CORE_NODE_FIELDS}`;

    const {data, error, loading} = useQuery(getContent, {
        variables: {
            workspace,
            id,
            language: locale,
        }
    });

    const content = data?.jcr?.nodeById?.content?.value || "no text"

    if (loading) {
        return "loading";
    }
    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>
    }

    return (
        // eslint-disable-next-line react/no-danger
        <div dangerouslySetInnerHTML={{__html: content}}/>
    )
}

RichText.propTypes = {
    id : PropTypes.string.isRequired
};

export default RichText
