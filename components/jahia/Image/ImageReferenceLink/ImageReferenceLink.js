import React, {useContext} from "react";
import {JahiaCtx} from "../../../../lib/context";
import {useQuery} from "@apollo/client";

import * as PropTypes from "prop-types";
import {queryImageRef} from "./gqlQuery";
import Default from "../Default";


function ImageReferenceLink({id,renderComponent,className}) {
    console.log("[ImageReferenceLink] renderComponent : ",renderComponent);

    const {workspace,locale} = useContext(JahiaCtx);
    const {data, error, loading} = useQuery(queryImageRef, {
        variables: {
            workspace,
            id,
            language: locale
        }
    });

    const imageRef = data?.jcr?.nodeById;

    if (loading) {
        return "loading";
    }
    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>
    }

    const imageNode = imageRef.imageNode?.refNode;
    let Component = Default;
    if(renderComponent)
        Component= renderComponent;

    return <Component path={imageNode?.path} alt={imageRef.alt?.value} className={className}/>
}

ImageReferenceLink.propTypes = {
    id : PropTypes.string.isRequired,
    renderComponent: PropTypes.func,
    className: PropTypes.string
};

export default ImageReferenceLink;
