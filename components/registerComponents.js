import React from 'react';
import {
    componentByMixin,
    componentRenderingModuleTag,
    componentsByType,
    ImageReferenceLink,
    RichText,
    templates,
} from '@jahia/nextjs-sdk';
import {
    BS4Grid,
    ContentRetrieval,
    IsotopeContentRetrieval,
    ClipPathBubble1,
    ClipPathBubble2,
} from '@jahia/nextjs-community-components';
import {
    Hero,
    TextImageFocus,
    WaveBlue,
    WaveDark,
} from './Hero';
import {
    Card as gCard,
    Hero as gHero,
    TextImageFocus as gTIF,
    Main as gMain,
    Isotope as gIsotope,
    GenericContentTemplate
} from './GenericContent';

import Gallery from './Gallery';
import FeatureContentBloc from './FeatureContentBloc';
import HalfBlock from './HalfBlock';
import MediaContentBloc from './MediaContentBloc';
import {OwlCarousel} from './owlCarousel';
import {Feature, Scaling,} from './images';
import {NavMenuHeader,NavMenuFooter} from './navMenu';
import {PageOpenTemplate,PageFixedStructureTemplate} from "./Page";
import {CardContentTemplate, Card} from "./Card";

import NavMenuText from './jahia/NavMenuText';
// import Widen from './jahia/Widen/Widen';

function ImageReferenceLinkWrapper(props) {
    return <ImageReferenceLink {...props} className="img-fluid"/>;
}

export const registerComponents = () => {

    Object.assign(templates, {
        'default': PageOpenTemplate,
        'open': PageOpenTemplate,
        'fixedstructure': PageFixedStructureTemplate,
        'hicnt:card': CardContentTemplate,
        'hicnt:genericContent': GenericContentTemplate

    });

    Object.assign(componentsByType, {
        // Community Module
        'bootstrap4nt:grid': BS4Grid,
        'jnt:contentRetrieval': {
            default: ContentRetrieval,
            isotope: IsotopeContentRetrieval,
        },
        'jnt:navMenuText': NavMenuText,
        // 'wdennt:widenReference': Widen,

        // Content Model Module
        'hicnt:heading': {
            default: Hero,
            'Text with image focus': TextImageFocus,
            'Wave blue': WaveBlue,
            'Wave Dark': WaveDark,
        },
        'hicnt:genericContent': {
            default: gMain,
            card: gCard,
            isotope: gIsotope,
            hero: gHero,
            'hero with image focus': gTIF,
        },
        'jnt:navMenuNext': {
            'Header Menu': NavMenuHeader,
            'Footer Menu': NavMenuFooter
        },
        'hicnt:galleryImage': Gallery,
        'hicnt:featureContentBloc': FeatureContentBloc,
        'hicnt:owlcarousel': OwlCarousel,
        'hicnt:halfBlock': HalfBlock,
        'hicnt:mediaContentBloc': MediaContentBloc,
        'hicnt:card': Card,
        'jnt:imageReferenceLink': ImageReferenceLinkWrapper,
        'hicnt:text': RichText
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
