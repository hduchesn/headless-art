import React from "react";
import {JahiaCtx} from "../../lib/context";
import {useQuery} from "@apollo/client";
import {queryImage} from "./gqlQuery";
import HalfBlock from "./HalfBlock";
import Basic from "./Basic";
import Bubble_1 from "./Bubble_1";

const views = {
    'halfBlock': HalfBlock,
    'bubble_1': Bubble_1,
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

export default Image;
