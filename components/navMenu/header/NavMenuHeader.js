import React from 'react';
import {JahiaCtx, MainResourceCtx, JahiaLink as Link, CORE_NODE_FIELDS} from '@jahia/nextjs-sdk';
import {gql, useQuery} from '@apollo/client';
import * as PropTypes from 'prop-types';
import SubNavMenuHeader from './SubNavMenuHeader';
import {useNavMenu} from "@jahia/nextjs-community-components";

export function NavMenuHeader({id}) {
    const {locale} = React.useContext(JahiaCtx);
    const mainResourcePath = React.useContext(MainResourceCtx);
    // console.log("[NavMenuHeader] mainResourcePath: ",mainResourcePath)

    const {data : navTree, loading, error} = useNavMenu({id});

    if (loading) {
        return 'loading';
    }

    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>;
    }

    // if (navTree) {
    //     console.log("[NavMenuHeader] data:",navTree)
    // }


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">

                <Link href={navTree.path} locale={locale}>
                    <a className="navbar-brand ">{navTree.title?.value}</a>
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarsExample05"
                    aria-controls="navbarsExample05"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse" id="navbarsExample05">
                    <ul className="navbar-nav pl-md-5 ml-auto">
                        {navTree.children?.nodes?.map(node => (<SubNavMenuHeader key={node.uuid} node={node} path={mainResourcePath}/>))}
                    </ul>

                    <div className="navbar-nav ml-auto">
                        <span style={{minWidth: '276px'}}>&nbsp;</span>
                        {/* <form method="post" className="search-form"> */}
                        {/*    <span className="icon ion ion-search"></span> */}
                        {/*    <input type="text" className="form-control" placeholder="Search..."/> */}
                        {/* </form> */}
                    </div>

                </div>
            </div>
        </nav>
    );
}

NavMenuHeader.propTypes = {
    id: PropTypes.string.isRequired
};
