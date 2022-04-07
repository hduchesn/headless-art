import RichText from "./jahia/RichText";
import Hero from "./Hero";
import {OwlCarousel} from "./owlCarousel";
import Article from "./Article";
import {PersonalizedContent} from "./jahia/PersonalizedContent";

const components = {
    'jnt:bigText': RichText,
    'hicnt:heading': Hero,
    'hicnt:owlcarousel': OwlCarousel,
    'hicnt:article': Article,
    'wemnt:personalizedContent': PersonalizedContent
}

export default components;
