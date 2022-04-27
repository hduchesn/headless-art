import React from "react";
import classNames from 'classnames';
import styles from './edit.module.css'
import Items from "./Items";
import * as PropTypes from "prop-types";
import {JahiaModuleTag} from "@jahia/nextjs-lib";
import cms from "../../../jahia";

function OwlCarousel({carousel}) {
    //Note: JahiaModuleTag is required here to pass the childNodeTypes and enable the "create" btn to add children carousel item
    return (
        <JahiaModuleTag path={carousel.path} nodetypes={[cms.contentTypes.INDUS_CAROUSEL_TESTIMONIAL_ITEM]}>
            <div
                id={carousel.uuid}
                className={classNames(
                    "nonloop-block-11 owl-carousel",
                    carousel.class?.value,
                    styles.jOwlCarouselEdit
                )}
            >
                <Items nodes={carousel.children.nodes}/>
            </div>
            {/*Jahia btn placeholder to add a new item*/}
            <JahiaModuleTag path="*" type="placeholder"/>
        </JahiaModuleTag>
    )
}

OwlCarousel.propTypes = {
    carousel : PropTypes.object.isRequired,
};

export default OwlCarousel;
