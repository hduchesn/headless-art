import {useNode} from "@jahia/nextjs-sdk";
import {animateProperties, WaveBlue, WaveDark} from "@jahia/nextjs-community-components";
import React from "react";

export function NavMenu({id, wave}) {
    const {data, error, loading} = useNode(id, ['body', 'mediaNode']);

    if (loading) {
        return 'loading';
    }

    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>;
    }

    const {body, mediaNode} = data.properties;
    const WaveCmp = wave === 'dark' ? WaveDark : WaveBlue;
    return (
