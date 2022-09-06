import {useNavMenu} from "@jahia/nextjs-community-components";
import React from "react";

export function NavMenu({id}) {
    const {data, loading, error} = useNavMenu({id});

    if (loading) {
        return 'loading';
    }

    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>;
    }

    if (data) {
        console.log("[NavMenu] data:",data)
    }
    return (<>Nav Menu</>)
}
