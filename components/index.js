import dynamic from 'next/dynamic'
import RichText from "./jahia/RichText";
import Hero from "./Hero";

const Carousel = dynamic(
    () => import("./owlCarousel"),
    // No need for SSR, when the module includes a library that only works in the
    // browser.
    { ssr: false }
);

const components = {
    'jnt:bigText': RichText,
    'hicnt:heading': Hero,
    'hicnt:owlcarousel' : Carousel
}

export default components;
