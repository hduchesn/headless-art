import React from 'react';
import {Area} from "@jahia/nextjs-sdk";
import * as PropTypes from "prop-types";
import {ContentLayout} from "../../Layout";
import {Hero,Main,GalleryFancyBox} from '../'

export function GenericContentTemplate({path, id}) {
    return (
        <ContentLayout path={path}>
            <Hero id={id} isTitleUsed={true}/>
            <Main id={id}/>
            <GalleryFancyBox id={id}/>
        </ContentLayout>
    )
}

GenericContentTemplate.propTypes = {
    id: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
};

// export default GenericContentTemplate;


