import React from 'react';
import {
    componentByMixin,
    componentRenderingModuleTag,
    componentsByType,
    ImageReferenceLink,
    RichText,
} from '@jahia/nextjs-sdk';
import {
    BS4Grid,
    ClipPathBubble1,
    ClipPathBubble2
} from '@jahia/nextjs-community-components';

import NavMenuText from './jahia/NavMenuText';

import Widen from './jahia/Widen/Widen';

import {Hero, Hero2Cols} from './Hero';
import Gallery from './Gallery';
import {OwlCarousel} from './owlCarousel';
import FeatureContentBloc from './FeatureContentBloc';
import HalfBlock from './HalfBlock';
import MediaContentBloc from './MediaContentBloc';
import Card from './Card';
import {
    Feature,
    Scaling,
    // ClipPathBubble1,
    // ClipPathBubble2
} from './images';

function ImageReferenceLinkWrapper(props) {
    return <ImageReferenceLink {...props} className="img-fluid"/>;
}

export const registerComponents = () => {
    Object.assign(componentsByType, {
        // Community Module
        'wdennt:widenReference': Widen,
        'bootstrap4nt:grid': BS4Grid,
        'jnt:navMenuText': NavMenuText,

        // Content Model Module
        'tint:text': RichText,
        'hicnt:text': RichText,
        'hicnt:heading': {
            default: Hero,
            '2Cols': Hero2Cols,
        },
        'hicnt:galleryImage': Gallery,
        'hicnt:featureContentBloc': FeatureContentBloc,
        'hicnt:owlcarousel': OwlCarousel,
        'hicnt:halfBlock': HalfBlock,
        'hicnt:mediaContentBloc': MediaContentBloc,
        'hicnt:card': Card,
        'jnt:imageReferenceLink': ImageReferenceLinkWrapper,
    });

    Object.assign(componentByMixin, {
        'jmix:image': {
            ...componentByMixin['jmix:image'],
            scaling: Scaling,
            feature: Feature,
            'bubble 1': ClipPathBubble1,
            'bubble 2': ClipPathBubble2,
        },
    });

    componentRenderingModuleTag.push(...[
        'hicnt:owlcarousel',
    ]);
};
