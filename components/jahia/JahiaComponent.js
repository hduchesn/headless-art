import React from "react";
import propTypes from 'prop-types';
import {JahiaCtx} from "../../lib/context";
import {generateUUID} from "./utils";
import RichText from "./RichText";
import Hero from "../Hero";
import {OwlCarousel} from "../owlCarousel";
import Article from "../Article";
import {PersonalizedContent} from "./PersonalizedContent";
import {PersonalizedList} from "./PersonalizedList";
import {ContentList} from "./ContentList";
import JahiaModuleTag from "./JahiaModuleTag";

const components = {
    'jnt:contentList': ContentList,
    'jnt:bigText': RichText,
    'hicnt:heading': Hero,
    'hicnt:owlcarousel': OwlCarousel,
    'hicnt:article': Article,
    'wemnt:personalizedContent': PersonalizedContent
}

const mixins = {
    'wemmix:personalizedList': PersonalizedList
}

function getComponent(node) {
    if (node.mixinTypes) {
        const mixin = node.mixinTypes.find(m => mixins[m])
        if (mixin) {
            return mixins[mixin]
        }
    }
    if (components[node.primaryNodeType.name]) {
        return components[node.primaryNodeType.name];
    }
}

export function JahiaComponent({node, tagProps}) {
    const {isEditMode} = React.useContext(JahiaCtx);
    const Component = getComponent(node);
    if (Component) {
        if (isEditMode) {
            return (
                <JahiaModuleTag path={node.path} {...tagProps}>
                    <Component id={node.uuid} path={node.path}/>
                </JahiaModuleTag>
            )
        }

        return (
            <Component id={node.uuid} path={node.path}/>
        )
    }
    return (
        <div key={node.uuid}>Unknown rendering for : {node.name} - {node.primaryNodeType.name}</div>
    )
}

JahiaComponent.propTypes = {
    node: propTypes.object.isRequired,
    tagProps: propTypes.object
}
