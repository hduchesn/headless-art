import React from 'react';
import Area from "../components/jahia/Area";
import {JahiaCtx} from "../lib/context";
import * as PropTypes from "prop-types";

function Home({path}) {
    const {isEditMode} = React.useContext(JahiaCtx)

    return (
        <>
            <Area
                name="testArea"
                mainResourcePath={path}
            />
            <Area
                name="testArea2"
                mainResourcePath={path}
            />
        </>

    )
}

Home.propTypes = {
    path: PropTypes.string.isRequired
};

export default Home;


