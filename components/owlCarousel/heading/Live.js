import React from "react";
import * as PropTypes from "prop-types";
import Items from "./Items";
import {ChevronLeft, ChevronRight} from "react-bootstrap-icons";
import classNames from "classnames";

function OwlCarousel({carousel}) {

    React.useEffect(() => {
        if (carousel?.uuid && process.browser) {
            import('owl.carousel').then( () => {
                // console.debug("[OwlCarousel] launch the carousel in the browser");

                let gqlOptions = {};
                try {
                    gqlOptions = JSON.parse(carousel.options?.value)
                } catch (error) {
                    console.warn("no options configured by user for the carousel: ", carousel.name)
                }

                const options = Object.assign({
                    items: 1,
                    loop: true,
                    autoplay: true,
                    margin: 0,
                    animateOut: 'fadeOut',
                    animateIn: 'fadeIn',
                    nav: true,
                    autoplayHoverPause: true,
                    dragTouch: false,
                    navText:[$(`#owl-prev-${carousel.uuid}`),$(`#owl-next-${carousel.uuid}`)],
                    responsive: {
                        0: {items: 1,nav: false},
                        600: {items: 1,nav: false},
                        1000: {items: 1,nav: true}
                    }
                }, gqlOptions);
                console.debug("[OwlCarousel] options: ",options);
                window.jQuery(`#${carousel.uuid}`).owlCarousel(options)
            })
        }
    }, [carousel]);

    return (
        <>
            <section id={carousel.uuid} className={classNames("home-slider owl-carousel",carousel.class?.value)}>
                <Items nodes={carousel.children.nodes}/>
            </section>
            <ChevronLeft id={`owl-prev-${carousel.uuid}`}/>
            <ChevronRight id={`owl-next-${carousel.uuid}`}/>
        </>

    )

}

OwlCarousel.propTypes = {
    carousel : PropTypes.object.isRequired,
};

export default OwlCarousel;
