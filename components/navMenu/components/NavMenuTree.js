import {useNode} from "@jahia/nextjs-sdk";
import {useNavMenuTree} from "@jahia/nextjs-community-components";
import React from "react";

export function NavMenuTree({menuProps}) {
    const {data, error, loading} = useNavMenuTree(menuProps);

    if (loading) {
        return 'loading';
    }

    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>;
    }

    console.log("[NavMenuTree] data:",data);

    return (<>Nav Menu Tree</>)
}
