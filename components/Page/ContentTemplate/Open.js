import React from 'react';
import {Area} from "@jahia/nextjs-sdk";
import * as PropTypes from "prop-types";
import {PageLayout} from "../../Layout";

export function PageOpenTemplate({path}) {
    return (
        <PageLayout path={path}>
            <Area name="mainContent" />
        </PageLayout>
    )
}

PageOpenTemplate.propTypes = {
    path: PropTypes.string.isRequired,
    templateName: PropTypes.string.isRequired
};

// export default Open;


