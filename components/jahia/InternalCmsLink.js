import React from 'react'
import NextLink from 'next/link'
import * as PropTypes from "prop-types";
import {JahiaCtx} from "../../lib/context";
import cms from "../../jahia";

function InternalCmsLink({href,...props}) {
    const {locale, isEditMode} = React.useContext(JahiaCtx);

    if(isEditMode){
        const url  = `${cms.paths.edit}/${locale}${href}.html`;
        const RenderCMSEditLink = () => (
            React.Children.map(props.children, child => {
                // console.log("[Link] child: ",child);
                // console.log("[Link] React.isValidElement(child): ",React.isValidElement(child));
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, { href:url }, ...child.props.children);
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

InternalCmsLink.propTypes = {
    href: PropTypes.string.isRequired,
    children: PropTypes.object.isRequired
};

export default InternalCmsLink
