import dynamic from 'next/dynamic'
import RichText from "./jahia/RichText";
import Hero from "./Hero";
import CarouselEdit from "./owlCarousel/edit";
import Article from "./Article";

const CarouselFront = dynamic(
    () => import("./owlCarousel"),
    // No need for SSR, when the module includes a library that only works in the
    // browser.
    {ssr: false}
);

// console.log("[components] RichText : ",RichText)
// console.log("[components] CarouselEdit : ",CarouselEdit)
const components = ({isEditMode}) => {

    return {
        'jnt:bigText': RichText,
        'hicnt:heading': Hero,
        'hicnt:owlcarousel': isEditMode ? CarouselEdit : CarouselFront,
        'hicnt:article': Article
    }
}

export default components;
