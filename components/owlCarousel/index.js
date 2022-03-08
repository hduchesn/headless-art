import React, {useContext} from "react";
import {JahiaCtx} from "../../lib/context";
import {gql, useQuery} from "@apollo/client";
import classNames from 'classnames';

import OWCHeading from "./heading"
// import OWCTestimonial from "./testimonial"

import {getJahiaDivsProps} from "../../lib/utils";

const carouselType = {
    'heading': OWCHeading,
    // 'testimonial': OWCTestimonial
}

const OwlCarousel = ({id, path,mainResourcePath, locale,isEdit}) =>{
    const {workspace} = useContext(JahiaCtx);
    const [divs, setDivs] = React.useState([]);
    const [carousel, setCarousel] = React.useState({});
    const isEditMode = JSON.parse(isEdit) || false;

    const getContent = gql`query (
        $workspace:Workspace!,
        $id: String!,
        $mainResourcePath: String,
        $language:String,
        $isEditMode: Boolean) {
        jcr(workspace: $workspace) {
            workspace
            nodeById(uuid:$id) {
                renderedContent(
                    mainResourcePath: $mainResourcePath,
                    language: $language,
                    isEditMode:$isEditMode) {
                    output
                }
                workspace
                uuid
                name
                path
                carouselType:property(name:"carouselType") {
                    value
                }
                options:property(name:"options") {
                    value
                }
                class:property(name:"class") {
                    value
                }
                children{
                    items:nodes{
                        workspace
                        uuid
                        path
                        primaryNodeType{name}
                    }
                }
            }
        }
    }`;

    useQuery(getContent, {
        variables: {
            workspace,
            id,
            language: locale,
            mainResourcePath,
            isEditMode
        },
        onCompleted: data => {
            setDivs(getJahiaDivsProps(data.jcr?.nodeById?.renderedContent?.output));
            setCarousel(data.jcr?.nodeById);
        }
    });

    if (carouselType[carousel.carouselType?.value]){
        const Component = carouselType[carousel.carouselType.value];
        return(
            <>
                <section id={carousel.uuid} className={classNames(
                    carousel.class,
                    {'j-owl-carousel-edit':isEditMode}
                )}>
                    <Component items={carousel.children.items} locale={locale} isEdit={isEdit}/>
                </section>
                {/*Jahia btn placeholder to add a new item*/}
                {isEditMode &&
                    <div {...divs["*"]}></div>
                }
            </>
        )
    }
    return(
        <p>The carousel type is not supported</p>
    )
}

export default OwlCarousel;
