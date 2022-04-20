import React from 'react'
import NextLink from 'next/link'
import * as PropTypes from "prop-types";
import {JahiaCtx} from "../../lib/context";
import cms from "../../jahia";

function CmsLink({href,...props}) {
    const {locale, isEditMode, isPreview} = React.useContext(JahiaCtx);

    if(isEditMode || isPreview){
        const url = isEditMode ?
            `${cms.paths.edit}/${locale}${href}.html` :
            `${cms.paths.preview}/${locale}${href}.html`;

        const RenderCMSEditLink = () => (
            React.Children.map(props.children, child => {
                // console.log("[CmsLink] child: ",child);
                // console.log("[CmsLink] React.isValidElement(child): ",React.isValidElement(child));
                if (React.isValidElement(child)) {
                    let children = []
                    if(child.props.children)
                        children = child.props.children;
                    return React.cloneElement(child, { href:url }, ...children);
                }
                return child;
            })
        )
        return <RenderCMSEditLink/>

    }

    return(
        <NextLink href={href} {...props}>
            {props.children}
        </NextLink>
    )
}

CmsLink.propTypes = {
    href: PropTypes.string.isRequired,
    children: PropTypes.object
};

export default CmsLink
