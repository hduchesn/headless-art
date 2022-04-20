import React from "react";
import {JahiaCtx} from "@jahia/nextjs-lib";
import {gql, useQuery} from "@apollo/client";
import * as PropTypes from "prop-types";
import {PlusLg} from "react-bootstrap-icons";

import WidenImage from "./jahia/Widen/components/Image";
import CmsImage from "./jahia/Image/Default";
import { CORE_NODE_FIELDS } from './jahia/GQL/fragments';


//TODO use xss to clean body
function Gallery({id}) {
    const {workspace, locale, isEditMode} = React.useContext(JahiaCtx);

    const getContent = gql`query($workspace: Workspace!, $id: String!,$language:String!){
        jcr(workspace: $workspace) {
            workspace
            nodeById(uuid: $id) {
                ...CoreNodeFields
                heading: property(language:$language, name:"heading"){value}
                iconClass: property(name:"iconClass"){value}
                media: property(language:$language,name:"wden:mediaNode",){
                    node: refNode {
                        ...CoreNodeFields
                        templatedUrl:property(name:"wden:templatedUrl"){value}
                    }
                }
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

    if (loading) {
        return "loading";
    }
    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>
    }

    const content = data?.jcr?.nodeById;
    const ImageComponent =
        content.media?.node?.templatedUrl?.value ?
            WidenImage : CmsImage;

    // {
    //     "element-animate":!isEditMode
    // }
    //TODO manage linkTo URL
    return (
        <a href="project-single.html" className="link-thumbnail">
            <h3>{content.heading?.value}</h3>
            <PlusLg className="icon"/>
            <ImageComponent
                id={content.media?.node?.uuid}
                path={content.media?.node?.path}
                className="img-fluid"
                alt={content.name}/>
        </a>
    )
}

Gallery.propTypes = {
    id: PropTypes.string.isRequired
};
export default Gallery;
