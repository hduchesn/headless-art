import React from "react";
import propTypes from 'prop-types';
import {JahiaCtx} from "../../lib/context";

import RichText from "./RichText";
import Hero from "../Hero";
import Gallery from "../Gallery";
import {OwlCarousel} from "../owlCarousel";
import {PersonalizedContent} from "./PersonalizedContent";
import {PersonalizedList} from "./PersonalizedList";
import {ContentList} from "./ContentList";
import JahiaModuleTag from "./JahiaModuleTag";
import BS4Grid from "./BS4/Grid";
import Widen from "./Widen/Widen";
import FeatureContentBloc from "../FeatureContentBloc";
import ImageReferenceLink from "./Image/ImageReferenceLink/ImageReferenceLink";

const components = {
    'jnt:contentList': ContentList,
    'bootstrap4nt:grid':BS4Grid,
    'wdennt:widenReference':Widen,
    'jnt:imageReferenceLink':ImageReferenceLink,
    'jnt:bigText': RichText,
    'tint:text': RichText,
    'hicnt:text': RichText,
    'hicnt:heading': Hero,
    'hicnt:galleryImage': Gallery,
    'hicnt:featureContentBloc': FeatureContentBloc,
    'hicnt:owlcarousel': OwlCarousel,
    'wemnt:personalizedContent': PersonalizedContent
}

const mixins = {
    'wemmix:personalizedList': PersonalizedList
}

function getComponent(node) {
    if (node.mixinTypes) {
        const mixin = node.mixinTypes.find(m => mixins[m.name])
        if (mixin) {
            return mixins[mixin.name]
        }
    }
    if (components[node.primaryNodeType.name]) {
        return components[node.primaryNodeType.name];
    }
}

export function JahiaComponent({node,renderComponent,className, tagProps}) {
    const {isEditMode} = React.useContext(JahiaCtx);
    const Component = getComponent(node);

    console.log("[JahiaComponent] Component : ",Component);
    console.log("[JahiaComponent] renderComponent : ",renderComponent);

    if (Component) {
        if (isEditMode) {
            return (
                <JahiaModuleTag path={node.path} {...tagProps}>
                    <Component id={node.uuid} renderComponent={renderComponent} className={className} path={node.path}/>
                </JahiaModuleTag>
            )
        }

        return (
            <Component id={node.uuid} renderComponent={renderComponent} className={className} path={node.path}/>
        )
    }
    return (
        <div key={node.uuid}>Unknown rendering for : {node.name} - {node.primaryNodeType.name}</div>
    )
}

JahiaComponent.propTypes = {
    node: propTypes.object.isRequired,
    renderComponent:propTypes.func,
    className:propTypes.string,
    tagProps: propTypes.object
}
