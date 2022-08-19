import React from 'react';
import {Area} from "@jahia/nextjs-sdk";
import * as PropTypes from "prop-types";
import {ContentLayout} from "../../components/Layout";
import {Hero,Main,GalleryFancyBox} from '../../components/GenericContent'
function ContentTemplate({path, id}) {
    return (
        <ContentLayout path={path}>
            <Hero id={id} isTitleUsed={true}/>
            <Main id={id}/>
            <GalleryFancyBox id={id}/>
        </ContentLayout>
    )
}

ContentTemplate.propTypes = {
    id: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
};

export default ContentTemplate;


