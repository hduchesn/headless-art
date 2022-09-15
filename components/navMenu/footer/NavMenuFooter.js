import {useNavMenu} from '@jahia/nextjs-community-components';
import {JahiaCtx, JahiaLink as Link} from '@jahia/nextjs-sdk';
import React from 'react';

export function NavMenuFooter({id}) {
    const {locale} = React.useContext(JahiaCtx);
    const {data, loading, error} = useNavMenu({id});

    if (loading) {
        return 'loading';
    }

    if (error) {
        console.log(error);
        return <div>[NavMenuFooter] Error when loading ${JSON.stringify(error)}</div>;
    }

    return (
        <>
            <h3>{data?.navMenuTitle}</h3>
            <ul className="list-unstyled footer-link">
                {data?.children?.filter(menuEntry => menuEntry.page).map(menuEntry => (
                    <li key={menuEntry.uuid}>
                        <Link href={menuEntry.path} locale={locale}>
                            <a>{menuEntry.title?.value}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}
