import React from 'react';
import {Area} from "@jahia/nextjs-sdk";
import * as PropTypes from "prop-types";
import {ContentLayout} from "../../components/Layout";
import {Hero,Main} from '../../components/GenericContent'
function ContentTemplate({path, id}) {
    return (
        <ContentLayout id={id} path={path}>
            <Hero id={id}/>
            <Main id={id}/>
        </ContentLayout>
    )
}

ContentTemplate.propTypes = {
    id: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
};

export default ContentTemplate;


