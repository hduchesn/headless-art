import {Area} from '@jahia/nextjs-sdk';
import React from 'react';

export function Header() {
    return (
        <header role="banner">
            <Area
                name="header-main-nav"
                path={`/sites/${process.env.NEXT_PUBLIC_JAHIA_SITE}`}
                tagProps={{
                    nodetypes: ['jnt:navMenuNext'],
                    listlimit: 1,
                }}
                // ComponentProps={{referenceComponent:NavMenuFooter}}
            />
        </header>
    );
}
