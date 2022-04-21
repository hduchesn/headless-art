import React, {useEffect} from 'react'
import {JahiaNextApp} from "@jahia/nextjs-lib";

import '../styles/style.scss';
import {registerTemplates} from "../templates/registerTemplates";

registerTemplates()

JahiaNextApp.useRender = () => {
    useEffect(() => {
        import("bootstrap/dist/js/bootstrap");
    }, [])
}

export default JahiaNextApp;
