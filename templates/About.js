import React from 'react';
import Area from "../components/jahia/Area";
// import {JahiaCtx} from "../lib/context";
import * as PropTypes from "prop-types";

function About({path}) {
    // const {isEditMode} = React.useContext(JahiaCtx)

    return (
        <>
            <Area
                name="hero"
                mainResourcePath={path}
            />

            <section className="section">
                <div className="container">
                    <div className="row justify-content-center mb-5">
                        <div className="col-md-6 text-center">
                            <Area
                                name="col-1"
                                mainResourcePath={path}
                            />
                        </div>
                        <div className="col-md-6 text-center">
                            <Area
                                name="col-2"
                                mainResourcePath={path}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}

About.propTypes = {
    path: PropTypes.string.isRequired
};
export default About;


