import React, {useContext} from "react";
import {JahiaCtx} from "../../lib/context";
import {gql, useQuery} from "@apollo/client";
import classNames from 'classnames';
import styles from './edit.module.css'


import {getJahiaDivsProps} from "../../lib/utils";
import {queryCarousel} from "./gqlQuery";
import carouselType from './carouselType';



const OwlCarousel = ({id, mainResourcePath, locale}) =>{
    const {workspace} = useContext(JahiaCtx);
    const [divs, setDivs] = React.useState([]);
    const [carousel, setCarousel] = React.useState({});

    // const carouselId = Math.ceil(Math.random()* 100000);

    useQuery(queryCarousel, {
        variables: {
            workspace,
            id,
            language: locale,
            mainResourcePath,
            isEditMode:true
        },
        onCompleted: data => {
            setDivs(getJahiaDivsProps(data.jcr?.nodeById?.renderedContent?.output));
            setCarousel(data.jcr?.nodeById);
        }
    });

    // console.log("[OwlCarousel] carousel.class :",carousel.class);
    if (carouselType[carousel.carouselType?.value]){
        const Component = carouselType[carousel.carouselType.value];
        return(
            <>
                <section id={carousel.uuid} className={classNames(
                    carousel.class?.value,
                    styles.jOwlCarouselEdit
                )}>
                    <Component items={carousel.children.items} locale={locale} divs={divs}/>
                </section>
                {/*Jahia btn placeholder to add a new item*/}
                <div {...divs["*"]}></div>
            </>
        )
    }
    return(
        <p>The carousel type is not supported</p>
    )
}

export default OwlCarousel;
