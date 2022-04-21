import React from 'react';
import Area from "../components/jahia/Area";
import * as PropTypes from "prop-types";
import Layout from "../components/layout";

function Open({templateName, path}) {
    return (
        <Layout templateName={templateName} path={path}>
            <Area
                name="mainContent"
                mainResourcePath={path}
            />
        </Layout>
    )
}

Open.propTypes = {
    path: PropTypes.string.isRequired,
    templateName: PropTypes.string.isRequired
};

export default Open;


