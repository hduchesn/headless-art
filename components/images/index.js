import React from "react";
import {JahiaCtx} from "../../lib/context";
import {useQuery} from "@apollo/client";
import {queryImage} from "./gqlQuery";
import HalfBlock from "./HalfBlock";
import Basic from "./Basic";
import BubbleI from "./Bubble_1";
import * as PropTypes from "prop-types";

const views = {
    'halfBlock': HalfBlock,
    'bubble_1': BubbleI,
    'default': Basic
}

const Image = ({id, view}) => {
    const {workspace, locale} = React.useContext(JahiaCtx);
    const [imageNode, setImageNode] = React.useState({})

    useQuery(queryImage, {
        variables: {
            workspace,
            id,
            language: locale
        },
        onCompleted: data => setImageNode(data.jcr?.nodeById)
    });

    const getView = () => {
        let View = views["default"]
        if (view && views[view]) {
            View = views[view];
        } else {
            console.warn(`Image View not found: ${view}; use default`)
        }
        return (
            <View imageNode={imageNode}/>
        );
    }

    return getView();
}

Image.propTypes = {
    id: PropTypes.string.isRequired,
    view: PropTypes.string.isRequired
};

export default Image;
