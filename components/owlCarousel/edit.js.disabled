import React, {useContext} from "react";
import {JahiaCtx} from "@jahia/nextjs-lib";
import {useQuery} from "@apollo/client";
import classNames from 'classnames';
import styles from './edit.module.css'

import {queryCarousel} from "./gqlQuery";
import {carousel as carouselType,carouselItem} from './types';
import * as PropTypes from "prop-types";
import JahiaModuleTag from "../jahia/JahiaModuleTag";

function OwlCarousel({id}) {
    const {workspace} = useContext(JahiaCtx);
    const {data, error, loading} = useQuery(queryCarousel, {
        variables: {
            workspace,
            id
        }
    });

    const carousel = data?.jcr?.nodeById;
    // const divs = useMemo(() => !loading && getJahiaDivsProps(data.jcr?.nodeById?.renderedContent?.output), [data, loading]);


    if (loading) {
        return "loading";
    }
    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>
    }

    if (carouselType[carousel.carouselType?.value]) {
        const type = carousel.carouselType.value;
        const Component = carouselType[type];
        const childNodeTypes = carousel.mixins.reduce((result,mixin) =>{
            if(carouselItem[mixin.name])
                result.push(carouselItem[mixin.name])
            return result
        },[]).join(" ");

        //Note: JahiaModuleTag is required here to pass the childNodeTypes and enable the "create" btn to add children carousel item
        return (
            <JahiaModuleTag path={carousel.path} nodetypes={childNodeTypes}>
                <section
                    id={carousel.uuid}
                    className={classNames(
                        carousel.class?.value,
                        styles.jOwlCarouselEdit
                    )}
                >
                    <Component items={carousel.children.nodes}/>
                </section>
                {/*Jahia btn placeholder to add a new item*/}
                <JahiaModuleTag path="*" type="placeholder"/>
            </JahiaModuleTag>
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
