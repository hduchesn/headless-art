import React from 'react';
import Area from "../components/jahia/Area";
import {JahiaCtx} from "../lib/context";
import * as PropTypes from "prop-types";
// import Home from "templates/Home";
import cms from "../jahia"
function Third({path}) {
    // const {isEditMode} = React.useContext(JahiaCtx)
    return (
        <>
            <Area
                name="hero"
                mainResourcePath={path}
                allowedTypes={[cms.contentTypes.HERO]}
            />

            <section className="section">
                <div className="container">
                    <div className="row justify-content-center mb-5">
                        <div className="col-md-8 text-center">
                            <Area
                                name="col-01"
                                mainResourcePath={path}
                            />
                        </div>
                        <div className="col-md-4 text-center">
                            <Area
                                name="col-02"
                                mainResourcePath={path}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="row justify-content-center mb-5">
                        <div className="col-md-4 text-center">
                            <Area
                                name="col-11"
                                mainResourcePath={path}
                            />
                        </div>
                        <div className="col-md-4 text-center">
                            <Area
                                name="col-12"
                                mainResourcePath={path}
                            />
                        </div>
                        <div className="col-md-4 text-center">
                            <Area
                                name="col-13"
                                mainResourcePath={path}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}
Third.propTypes = {
    path: PropTypes.string.isRequired
};

export default Third;


