import React from 'react';
import Area from "../components/jahia/Area";
import * as PropTypes from "prop-types";

function Open({path}) {
    return (
        <Area
            name="mainContent"
            mainResourcePath={path}
        />
    )
}

Open.propTypes = {
    path: PropTypes.string.isRequired
};

export default Open;


