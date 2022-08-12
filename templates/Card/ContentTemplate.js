import React from 'react';
import {Area} from "@jahia/nextjs-sdk";
import * as PropTypes from "prop-types";
import {ContentLayout} from "../../components/Layout";

function ContentTemplate({path, id}) {
    return (
        <ContentLayout path={path}>
            <h1>Hello card content !</h1>
        </ContentLayout>
    )
}

ContentTemplate.propTypes = {
    id: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    templateName: PropTypes.string.isRequired
};

export default ContentTemplate;


