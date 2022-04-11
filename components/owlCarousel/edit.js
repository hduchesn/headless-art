import React, {useContext, useMemo} from "react";
import {JahiaCtx, MainResourceCtx} from "../../lib/context";
import {useQuery} from "@apollo/client";
import classNames from 'classnames';
import styles from './edit.module.css'


import {getJahiaDivsProps} from "../../lib/utils";
import {queryCarousel} from "./gqlQuery";
import carouselType from './carouselType';
import * as PropTypes from "prop-types";


function OwlCarousel({id}) {
    const {workspace, locale} = useContext(JahiaCtx);
    const mainResourcePath = React.useContext(MainResourceCtx);
    // const [divs, setDivs] = React.useState([]);
    // const [carousel, setCarousel] = React.useState({});

    // const carouselId = Math.ceil(Math.random()* 100000);

    const {data, error, loading} = useQuery(queryCarousel, {
        variables: {
            workspace,
            id,
            language: locale,
            mainResourcePath,
            isEditMode: true
        },
        // onCompleted: data => {
        //     setDivs(getJahiaDivsProps(data.jcr?.nodeById?.renderedContent?.output));
        //     setCarousel(data.jcr?.nodeById);
        // }
    });

    const carousel = data?.jcr?.nodeById;
    const divs = useMemo(() => !loading && getJahiaDivsProps(data.jcr?.nodeById?.renderedContent?.output), [data, loading]);


    if (loading) {
        return "loading";
    }
    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>
    }

    // console.log("[OwlCarousel] carousel.class :",carousel.class);
    if (carouselType[carousel.carouselType?.value]) {
        const Component = carouselType[carousel.carouselType.value];
        return (
            <>
                <section
                    id={carousel.uuid}
                    className={classNames(
                        carousel.class?.value,
                        styles.jOwlCarouselEdit
                    )}
                >
                    <Component items={carousel.children.items} divs={divs}/>
                </section>
                {/*Jahia btn placeholder to add a new item*/}
                <div {...divs["*"]}/>
            </>
        )
    }
    return (
        <p>The carousel type is not supported</p>
    )
}

OwlCarousel.propTypes = {
    id : PropTypes.string.isRequired,
};

export default OwlCarousel;
