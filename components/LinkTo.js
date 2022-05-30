import React from "react";
import * as PropTypes from "prop-types";
import styles from "./linkTo.module.css";
import NextLink from "next/link";
import CmsLink from "./jahia/CmsLink";

function LinkTo({content,locale,fallback,children}) {

    if(!content.linkType || !(content.externalLink || content.internalLink)){
        if(fallback.elt){
            function Fallback() {
                // const eltChildren = [children].flat()
                return React.createElement(
                    fallback.elt,
                    {className:styles[fallback?.className]},
                    children
                )
            }
            return (
                <Fallback>
                    {children}
                </Fallback>
            )
        }
        return children
    }


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
LinkTo.propTypes = {
    content: PropTypes.object.isRequired,
    locale: PropTypes.string,
    fallback: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired
};

export default LinkTo;
