import React, {useContext, useRef} from 'react';
import {JahiaCtx} from "../../lib/context";
import {gql, useQuery} from "@apollo/client";
import * as PropTypes from "prop-types";
import {CxsCtx} from "../../lib/cxs";
import {JahiaComponent} from "./JahiaComponent";

export function PersonalizedContentLive({id, firstOnly}) {
    const {locale} = useContext(JahiaCtx);
    const cxs = useContext(CxsCtx);

    const getPersonalizedContent = gql`query($id:String!, $profileId:String!, $sessionId:String!) {
        jcr(workspace: LIVE) {
            workspace
            nodeById(uuid: $id) {
                uuid
                workspace
                path
                jExperience(
                    profileId: $profileId
                    sessionId: $sessionId
                ) {
                    personalizedVariants {
                        uuid
                        workspace
                        path
                        primaryNodeType {
                            name
                        }
                        mixinTypes {
                            name
                        }
                    }
                }
            }
        }
    }`

    const {data, loading, error} = useQuery(getPersonalizedContent, {
        variables: {
            id,
            profileId: cxs?.profileId,
            sessionId: cxs?.sessionId,
            language: locale
        },
        skip: !cxs,
    });

    if (loading) {
        return "loading";
    }
    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>
    }

    const nodes = data?.jcr?.nodeById.jExperience.personalizedVariants;

    return !!nodes && nodes.length > 0 && (
        firstOnly ? (
            <JahiaComponent node={nodes[0]}/>
        ) : (
            nodes.map(n => <JahiaComponent key={n.uuid} node={n}/>)
        )
    );
}

PersonalizedContentLive.propTypes = {
    id: PropTypes.string.isRequired,
    firstOnly: PropTypes.bool
}

