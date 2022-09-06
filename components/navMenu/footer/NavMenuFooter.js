import {useNavMenu} from "@jahia/nextjs-community-components";
import {JahiaCtx, JahiaLink as Link} from '@jahia/nextjs-sdk';
import React from "react";

export function NavMenuFooter({id}) {
    const {locale} = React.useContext(JahiaCtx);
    const {data, loading, error} = useNavMenu({id});

    if (loading) {
        return 'loading';
    }

    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>;
    }

    if (data) {
        console.log("[NavMenuFooter] data:",data)
    }
    return (
        <>
            <h3>{data?.navMenuTitle}</h3>
            <ul className="list-unstyled footer-link">
                {data?.children?.map(menuEntry => (
                    <li>
                        <Link href={menuEntry.path} locale={locale}>
                            <a>{menuEntry.title?.value}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
}
