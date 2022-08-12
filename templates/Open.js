import React from 'react';
import {Area} from "@jahia/nextjs-sdk";
import * as PropTypes from "prop-types";
import {PageLayout} from "../components/Layout";

function Open({path}) {
    return (
        <PageLayout path={path}>
            <Area name="mainContent" />
        </PageLayout>
    )
}

Open.propTypes = {
    path: PropTypes.string.isRequired,
    templateName: PropTypes.string.isRequired
};

export default Open;


