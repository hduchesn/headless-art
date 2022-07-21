import React from 'react';
import * as PropTypes from 'prop-types';
import styles from './linkTo.module.css';
import NextLink from 'next/link';
import {JahiaLink} from '@jahia/nextjs-sdk';
import classnames from 'classnames';

function Fallback({fallback, children}) {
    if(!fallback.elt)
        return children;

    return React.createElement(
        fallback.elt,
        {
            className: classnames(
                fallback?.className,
                fallback?.css?.reduce((classes, item) => {
                    classes[styles[item]] = true;
                    return classes;
                }, {}),
            ),
        },
        children,
    );
}

Fallback.propTypes = {
    fallback: PropTypes.object,
    children: PropTypes.node.isRequired,
};

export function LinkTo({content, locale, fallback, className, children}) {
    // {[styles[fallback?.class]]:true}
    const {linkType, externalLink, internalLink, linkTarget,path} = content;
    let Component,url;

    switch(linkType){
        case "externalLink":
            if(!externalLink)
                return <Fallback fallback={fallback} children={children}/>;
            Component = NextLink;
            url = externalLink;
            break;
        case "internalLink":
            if(!internalLink)
                return <Fallback fallback={fallback} children={children}/>;
            Component = JahiaLink;
            url = internalLink.path;
            break;
        case "self":
            Component = JahiaLink;
            url = path;
            break;
        default:
            return <Fallback fallback={fallback} children={children}/>;
    }

    return (
        <Component href={url} locale={locale}>
            <a target={linkTarget} className={className}>
                {children}
            </a>
        </Component>
    );
}

LinkTo.propTypes = {
    content: PropTypes.object.isRequired,
    locale: PropTypes.string,
    fallback: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};
