import React from "react";
import {JahiaCtx} from "@jahia/nextjs-lib";
import {gql, useQuery} from "@apollo/client";
import * as PropTypes from "prop-types";
import { CORE_NODE_FIELDS } from './jahia/GQL/fragments';
import CmsImage from "./jahia/Image/Default";
import CmsLink from "./jahia/CmsLink";
import NextLink from 'next/link';
import styles from './card.module.css'

function LinkedContent({content,locale,children}) {
    if(!content.linkType || !(content.externalLink || content.internalLink))
        return <div className={styles.aLike}>{children}</div>

    let Component = NextLink;
    let url = content.externalLink?.value;

    if(content.internalLink?.node){
        Component = CmsLink;
        url = content.internalLink.node.path
    }
    return(
        <Component href={url} locale={locale}>
            <a target={content.linkTarget?.value}>
                {children}
            </a>
        </Component>
    )
}
LinkedContent.propTypes = {
    content: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    locale: PropTypes.string
};

//TODO use xss to clean body
function Card({id}) {
    const {workspace, locale} = React.useContext(JahiaCtx);

    const getContent = gql`query($workspace: Workspace!, $id: String!,$language:String!){
        jcr(workspace: $workspace) {
            workspace
            nodeById(uuid: $id) {
                ...CoreNodeFields
                linkType: property(name:"linkType"){value}
                linkTarget: property(name:"linkTarget"){value}
                externalLink: property(name:"externalLink"){value}
                internalLink: property(name:"internalLink"){
                    node: refNode {
                        ...CoreNodeFields
                    }
                }
                body: property(language:$language, name:"body"){value}
                media: property(language:$language,name:"mediaNode",){
                    node: refNode {
                        ...CoreNodeFields
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
    const ImageComponent = CmsImage;

    return (
        <div className="media d-block media-custom text-center">
            <LinkedContent content={content} locale={locale}>
                <ImageComponent
                    id={content.media?.node?.uuid}
                    path={content.media?.node?.path}
                    className="img-fluid"
                    alt={content.name}/>
            </LinkedContent>
            {/* eslint-disable-next-line react/no-danger */}
            <div dangerouslySetInnerHTML={{__html: content.body?.value || 'no body'}}/>
        </div>
    )
}

Card.propTypes = {
    id: PropTypes.string.isRequired
};
export default Card;