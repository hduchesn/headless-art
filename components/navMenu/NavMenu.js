import {useNode} from "@jahia/nextjs-sdk";
import {navMenuProperties, WaveBlue, WaveDark} from "@jahia/nextjs-community-components";
import React from "react";

export function NavMenu({id, wave}) {
    const {data, error, loading} = useNode(id, [...navMenuProperties]);

    if (loading) {
        return 'loading';
    }

    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>;
    }

    const {body, mediaNode} = data.properties;

    return (<></>)
}
