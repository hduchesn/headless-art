import React, {useContext} from "react";
import {JahiaCtx} from "../../lib/context";
import {gql, useQuery} from "@apollo/client";
import * as PropTypes from "prop-types";
import { CORE_NODE_FIELDS } from './GQL/fragments';

//TODO use xss to clean content

function NavMenuText({id}) {
    const {workspace, locale} = useContext(JahiaCtx);

    const getContent = gql`query($workspace: Workspace!, $id: String!,$language:String!){
        jcr(workspace: $workspace) {
            workspace
            nodeById(uuid: $id) {
                ...CoreNodeFields
                displayName(language:$language)
            }
        }
    }
    ${CORE_NODE_FIELDS}`;

    const {data, error, loading} = useQuery(getContent, {
        variables: {
            workspace,
            id,
            language: locale
        }
    });

    if (loading) {
        return "loading";
    }

    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>
    }

    return <h3>{data?.jcr?.nodeById?.displayName}</h3>

}

NavMenuText.propTypes = {
    id : PropTypes.string.isRequired
};

export default NavMenuText
