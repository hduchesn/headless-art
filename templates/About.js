import React from 'react';
import Area from "../components/jahia/Area";
import components from "../components/";
import {JahiaCtx} from "../lib/context";

const About = ({path,locale,templateName}) => {
    const {isEditMode} = React.useContext(JahiaCtx)
console.log("[About] templateName : ",templateName);
    return(
        <>
            <Area
                name="hero"
                mainResourcePath={path}
                components={components({isEditMode})}
                locale={locale}/>

            <section className="section">
                <div className="container">
                    <div className="row justify-content-center mb-5">
                        <div className="col-md-6 text-center">
                            <Area
                                name="col-1"
                                mainResourcePath={path}
                                components={components({isEditMode})}
                                locale={locale}/>
                        </div>
                        <div className="col-md-6 text-center">
                            <Area
                                name="col-2"
                                mainResourcePath={path}
                                components={components({isEditMode})}
                                locale={locale}/>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}
export default About;


