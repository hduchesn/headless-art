import React from 'react';
import {JahiaCtx, JahiaLink as Link, CORE_NODE_FIELDS} from '@jahia/nextjs-sdk';
import {gql, useQuery} from '@apollo/client';
import {contentTypes} from '../jahia/common';
import * as PropTypes from 'prop-types';
import SubNav from './SubNav';

function Nav({base, path}) {
    const {workspace, locale} = React.useContext(JahiaCtx);
    const getSitePages = gql`query(
        $workspace: Workspace!,
        $base: String!,
        $language: String!,
        $title:String!,
        $MenuItem:[String]!
        $isLevel3:Boolean!) {

        jcr(workspace: $workspace) {
            workspace
            # first node is site level
            nodeByPath(path: $base) {
                ...CoreNodeFields
                children(fieldFilter:{filters:{fieldName:"page", value:"true"}}) {
                    # Home Page level
                    nodes {
                        ...CorePageNodeFields
                        isHomePage : property(name:"j:isHomePage") {
                            value
                        }
                        children(fieldFilter:{filters:{fieldName:"page", value:"true"}}) {
                            # Home Page sub-level 
                            nodes {
                                ...CorePageNodeFields
                                # Home Page sub-sub-level
                                children(fieldFilter:{filters:{fieldName:"page", value:"true"}}) @include(if: $isLevel3) { 
                                    # Home Page sub-level 
                                    nodes {
                                        ...CorePageNodeFields
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    fragment CorePageNodeFields on JCRNode {
        ...CoreNodeFields
        page: isNodeType(type: {types:$MenuItem})
        title: property(name: $title, language: $language) { value }
    }
    ${CORE_NODE_FIELDS}`;
    // Console.log(`[Nav] base : ${base}, workspace: ${workspace}, locale: ${locale}, title: ${contentTypes.PROPS.TITLE}, MenuItem: ${contentTypes.MENU_ITEM}`);

    const {data, error, loading} = useQuery(getSitePages, {
        variables: {
            base,
            workspace,
            language: locale,
            title: contentTypes.PROPS.TITLE,
            MenuItem: contentTypes.MENU_ITEM,
            isLevel3: true,
        },
    });
    // Console.log("[nav] nodes: ",data?.jcr?.nodeByPath?.children?.nodes);
    // console.log("[nav] loading: ",loading);

    const navTree = data?.jcr?.nodeByPath?.children?.nodes?.filter(page => page.isHomePage?.value === 'true')[0];

    if (loading) {
        return 'loading';
    }

    if (error) {
        console.log(`[nav] locale: ${locale}`);
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>;
    }

    if (!navTree) {
        console.error('Error no HomePage found (check publication status or isHomePage property)');
        return (<div>Error no HomePage found (check publication status or isHomePage property)</div>);
    }

    // Console.log("[nav] navTree: ",navTree);
    // console.log("[nav] navTree.path: ",navTree.path);
    // const slug = navTree.path;
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
                        {navTree.children?.nodes?.map(node => (<SubNav key={node.uuid} node={node} path={path}/>))}
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

Nav.propTypes = {
    path: PropTypes.string.isRequired,
    base: PropTypes.string.isRequired,
};

export default Nav;
