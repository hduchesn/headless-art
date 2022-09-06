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
    ContentRetrieval,
    IsotopeContentRetrieval,
    ClipPathBubble1,
    ClipPathBubble2,
} from '@jahia/nextjs-community-components';

import NavMenuText from './jahia/NavMenuText';

import Widen from './jahia/Widen/Widen';

import {
    Hero,
    TextImageFocus,
    WaveBlue,
    WaveDark,
} from './Hero';
import Gallery from './Gallery';
import {OwlCarousel} from './owlCarousel';
import FeatureContentBloc from './FeatureContentBloc';
import HalfBlock from './HalfBlock';
import MediaContentBloc from './MediaContentBloc';
import Card from './Card';
import {
    Feature,
    Scaling,
} from './images';

import {
    Card as gCard,
    Hero as gHero,
    TextImageFocus as gTIF,
    Main as gMain,
    Isotope as gIsotope,
} from './GenericContent';

import {
    NavMenuHeader,
    NavMenuFooter
} from './navMenu';

function ImageReferenceLinkWrapper(props) {
    return <ImageReferenceLink {...props} className="img-fluid"/>;
}

export const registerComponents = () => {
    Object.assign(componentsByType, {
        // Community Module
        'wdennt:widenReference': Widen,
        'bootstrap4nt:grid': BS4Grid,
        'jnt:navMenuText': NavMenuText,
        'jnt:contentRetrieval': {
            default: ContentRetrieval,
            isotope: IsotopeContentRetrieval,
        },

        // Content Model Module
        'tint:text': RichText,
        'hicnt:text': RichText,
        'hicnt:heading': {
            default: Hero,
            'Text with image focus': TextImageFocus,
            'Wave blue': WaveBlue,
            'Wave Dark': WaveDark,
        },
        'hicnt:galleryImage': Gallery,
        'hicnt:featureContentBloc': FeatureContentBloc,
        'hicnt:owlcarousel': OwlCarousel,
        'hicnt:halfBlock': HalfBlock,
        'hicnt:mediaContentBloc': MediaContentBloc,
        'hicnt:card': Card,
        'jnt:imageReferenceLink': ImageReferenceLinkWrapper,
        'hicnt:genericContent': {
            default: gMain,
            card: gCard,
            isotope: gIsotope,
            hero: gHero,
            'hero with image focus': gTIF,
        },
        'jnt:navMenuNext': {
            default: NavMenuHeader,
            'Footer Menu': NavMenuFooter
        }
    });

    Object.assign(componentByMixin, {
        'jmix:image': {
            ...componentByMixin['jmix:image'],
            scaling: Scaling,
            feature: Feature,
            'bubble 1': ClipPathBubble1,
            'bubble 2': ClipPathBubble2,
        }
    });

    componentRenderingModuleTag.push(...[
        'hicnt:owlcarousel',
    ]);
};
