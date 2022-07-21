import React from 'react';
import {Area} from "@jahia/nextjs-sdk";
import * as PropTypes from "prop-types";
import {ContentLayout} from "../../components/Layout";

function ContentTemplate({templateName, path}) {
    return (
        <ContentLayout templateName={templateName} path={path}>
            <h1>Hello card content !</h1>
        </ContentLayout>
    )
}

ContentTemplate.propTypes = {
    path: PropTypes.string.isRequired,
    templateName: PropTypes.string.isRequired
};

export default ContentTemplate;


