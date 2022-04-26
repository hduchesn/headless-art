import React from "react";
import * as PropTypes from "prop-types";
import Items from "./Items";
import {ChevronLeft, ChevronRight} from "react-bootstrap-icons";
import classNames from "classnames";

function OwlCarousel({carousel}) {

    React.useEffect(() => {
        if (carousel?.uuid && process.browser) {
            import('owl.carousel').then( () => {
                console.debug("[OwlCarousel] launch the carousel in the browser");

                let gqlOptions = {};
                try {
                    gqlOptions = JSON.parse(carousel.options?.value)
                } catch (error) {
                    console.warn("no options configured by user for the carousel: ", carousel.name)
                }

                const options = Object.assign({
                    center: false,
                    items: 1,
                    loop: false,
                    stagePadding: 20,
                    margin:50,
                    nav: true,
                    smartSpeed: 1000,
                    navText:[$(`#owl-prev-${carousel.uuid}`),$(`#owl-next-${carousel.uuid}`)],
                    responsive:{
                        600:{stagePadding: 20,items:1},
                        800:{stagePadding: 20,items:1},
                        1000:{/*stagePadding: 200,*/items:1}
                    }
                }, gqlOptions);
                console.debug("[OwlCarousel] options: ",options);
                window.jQuery(`#${carousel.uuid}`).owlCarousel(options)
            })
        }
    }, [carousel]);

    return (
        <>
            <div
                id={carousel.uuid}
                className={classNames("nonloop-block-11 owl-carousel",carousel.class?.value)}
            >
                <Items nodes={carousel.children.nodes}/>
            </div>
            <span id={`owl-prev-${carousel.uuid}`}>
                <ChevronLeft/>
            </span>
            <span id={`owl-next-${carousel.uuid}`}>
                <ChevronRight/>
            </span>

        </>

    )

}

OwlCarousel.propTypes = {
    carousel : PropTypes.object.isRequired,
};

export default OwlCarousel;
