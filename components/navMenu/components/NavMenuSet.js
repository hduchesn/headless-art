import {useNode} from "@jahia/nextjs-sdk";
import {useNavMenuSet} from "@jahia/nextjs-community-components";
import React from "react";

export function NavMenuSet({menuProps}) {
    const {data, error, loading} = useNavMenuSet(menuProps);

    if (loading) {
        return 'loading';
    }

    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>;
    }

    console.log("[NavMenuSet] data:",data);

    return (<>Nav Menu Set</>)
}
