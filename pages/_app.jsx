import React, {useEffect} from 'react'
import {JahiaNextApp} from "@jahia/nextjs-lib";

import '../styles/style.scss';

JahiaNextApp.useRender = () => {
    useEffect(() => {
        import("bootstrap/dist/js/bootstrap");
    }, [])
}

export default JahiaNextApp;
