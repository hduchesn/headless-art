import {useNode} from "@jahia/nextjs-sdk";
import {navMenuProperties} from "@jahia/nextjs-community-components";
import React from "react";
import {NavMenuTree,NavMenuSet} from "./components";

export function NavMenu({id}) {
    const {data, error, loading} = useNode(id, [...navMenuProperties]);

    if (loading) {
        return 'loading';
    }

    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>;
    }

    if (data && data.properties) {
        const {'j:menuType': menuType} = data.properties;
        console.log("[NavMenu] menuType:",menuType)
        switch (menuType) {
            case "tree": {
                    return <NavMenuTree menuProps={data.properties}/>;
                }

            case "set":
                return <NavMenuSet menuProps={data.properties}/>;
            default: return <div>Oups no rendering for menuType {menuType}</div>;
        }
    }
}
