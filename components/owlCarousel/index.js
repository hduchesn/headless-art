import React, {useContext} from "react";
import {JahiaCtx} from "../../lib/context";
import {useQuery} from "@apollo/client";

import OWCHeading from "./heading"
// import OWCTestimonial from "./testimonial"

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';
import {queryCarousel} from "./gqlQuery";
import carouselType from './carouselType';

const OwlCarousel = ({id,mainResourcePath}) =>{
    const {workspace,locale} = useContext(JahiaCtx);
    const [carousel, setCarousel] = React.useState({});

    React.useEffect(() => {
        if(carousel.uuid && process.browser){
            console.log("[OwlCarousel] launch the carousel in the browser");

            let gqlOptions = {};
            try{
                gqlOptions = JSON.parse(carousel.options?.value)
            }catch (error){
                console.warn("no options configured for the carousel: ",carousel.name)
            }

            const options = Object.assign({
                loop:true,
                autoplay: true,
                margin:0,
                animateOut: 'fadeOut',
                animateIn: 'fadeIn',
                nav:true,
                autoplayHoverPause: true,
                items: 1,
                dragTouch: false,
                navText : ["<span class='ion-chevron-left'></span>","<span class='ion-chevron-right'></span>"],
                responsive:{
                    0:{
                        items:1,
                        nav:false
                    },
                    600:{
                        items:1,
                        nav:false
                    },
                    1000:{
                        items:1,
                        nav:true
                    }
                }
            },gqlOptions);
            window.jQuery(`#${carousel.uuid}`).owlCarousel(options)

        }
    }, [carousel]);

    useQuery(queryCarousel, {
        variables: {
            workspace,
            id,
            language: locale,
            mainResourcePath,
            isEditMode:false
        },
        onCompleted: data => {
            setCarousel(data.jcr?.nodeById);
        }
    });

// console.log("[OwlCarousel] carousel.class :",carousel.class);
    if (carouselType[carousel.carouselType?.value]){
        const Component = carouselType[carousel.carouselType.value];
        return(
            <>
                <section id={carousel.uuid} className={carousel.class?.value}>
                    <Component items={carousel.children.items}/>
                </section>
            </>
        )
    }
    return(
        <p>The carousel type is not supported</p>
    )
}

export default OwlCarousel;
