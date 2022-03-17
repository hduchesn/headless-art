import React from "react";
import Link from "next/link";
import {JahiaCtx} from "../lib/context";
import {gql, useQuery} from "@apollo/client";
import {contentTypes} from "./jahia/common";
import classnames from "classnames";

const Nav = ({base,path}) => {
    const {workspace,locale} = React.useContext(JahiaCtx)
    const [navTree, setNavTree] = React.useState({});
//TODO update query to start from virtualnode as base
    const getSitePages = gql`query(
        $workspace: Workspace!,
        $base: String!,
        $language: String!,
        $title:String!,
        $MenuItem:[String]!) {
        
        jcr(workspace: $workspace) {
            workspace
            nodeByPath(path: $base) {
                workspace
                uuid
                path
                title: property(name: $title  , language: $language) {
                    value
                }
                children(fieldFilter:{filters:{fieldName:"page", value:"true"}}) {
                    nodes {
                        workspace
                        uuid
                        path
                        primaryNodeType {
                            name
                        }
                        page: isNodeType(type: {types:$MenuItem})
                        title: property(name: $title, language: $language) {
                            value
                        }
                        children(fieldFilter:{filters:{fieldName:"page", value:"true"}}) {
                            nodes {
                                workspace
                                uuid
                                path
                                primaryNodeType {
                                    name
                                }
                                page: isNodeType(type: {types:$MenuItem})
                                title: property(name: $title, language: $language) {
                                    value
                                }
                            }
                        }
                    }
                }
            }
        }
    }`;
console.log(`[Nav] base : ${base}, workspace: ${workspace}, locale: ${locale}, title: ${contentTypes.PROPS.TITLE}, MenuItem: ${contentTypes.MENU_ITEM}`);

    useQuery(getSitePages, {
        variables: {
            base,
            workspace,
            language: locale,
            title: contentTypes.PROPS.TITLE,
            MenuItem: contentTypes.MENU_ITEM
        },
        onCompleted: data => {
console.log("[Nav] data",data);
            setNavTree(data.jcr?.nodeByPath)
        },
        onError: error => {
console.log("[Nav] error",error);
        }
    });

// console.log("[Nav] ret",ret);
// console.log("[Nav] ret.data",ret.data);
// console.log("[Nav] ret.loading",ret.loading);
// console.log("[Nav] ret.error",ret.error);
// console.log("[Nav] navTree",navTree);

    const hasChildren = (node) => {
        return Array.isArray(node.children?.nodes) && node.children.nodes.length >0
    }

    const buildAnchorProps = (node) => {
        const aProps = {
            className:classnames("nav-link",{
                active:node.path === path,
                'dropdown-toggle': hasChildren(node)
            })
        }

        if(hasChildren(node)){
            aProps.id=node.uuid;
            aProps['data-toggle'] = "dropdown";
            aProps['aria-haspopup']="true";
            aProps['aria-expanded']="false";
        }

        return aProps
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link href={navTree.path || ""} locale={locale}>
                    <a className="navbar-brand " >{navTree.title?.value}</a>
                </Link>

                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarsExample05">
                    <ul className="navbar-nav pl-md-5 ml-auto">
                        {
                            navTree.children?.nodes?.map(node =>{
                                console.log("node.path : ",node.path);
                                return(
                                    <li key={node.uuid}
                                        className={classnames("nav-item",{
                                            dropdown: hasChildren(node)
                                        })}
                                    >
                                        <Link href={node.path} locale={locale}>
                                            <a {...buildAnchorProps(node)}>
                                                {node.title?.value}
                                            </a>
                                        </Link>
                                        {hasChildren(node) &&
                                            (<div className="dropdown-menu" aria-labelledby={node.uuid}>
                                                {node.children.nodes.map( node2 =>{
                                                    console.log("node2.path : ",node2.path);
                                                    return(
                                                        <Link href={node2.path} key={node2.uuid} locale={locale}>
                                                            <a className="dropdown-item">
                                                                {node2.title?.value}
                                                            </a>
                                                        </Link>
                                                    )}
                                                )}
                                            </div>)
                                        }
                                    </li>
                                )

                            })
                        }
                        {/*<li className="nav-item">*/}
                        {/*    <a className="nav-link" href="index.html">Home</a>*/}
                        {/*</li>*/}
                        {/*<li className="nav-item">*/}
                        {/*    <a className="nav-link  active" href="about.html">About</a>*/}
                        {/*</li>*/}
                        {/*<li className="nav-item">*/}
                        {/*    <a className="nav-link" href="projects.html">Projects</a>*/}
                        {/*</li>*/}
                        {/*<li className="nav-item dropdown">*/}
                        {/*    <a className="nav-link dropdown-toggle" href="services.html" id="dropdown04"*/}
                        {/*       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Services</a>*/}
                        {/*    <div className="dropdown-menu" aria-labelledby="dropdown04">*/}
                        {/*        <a className="dropdown-item" href="services.html">Architectural Design</a>*/}
                        {/*        <a className="dropdown-item" href="services.html">Interior</a>*/}
                        {/*        <a className="dropdown-item" href="services.html">Building</a>*/}
                        {/*    </div>*/}
                        {/*</li>*/}
                        {/*<li className="nav-item">*/}
                        {/*    <a className="nav-link" href="blog.html">Blog</a>*/}
                        {/*</li>*/}
                        {/*<li className="nav-item">*/}
                        {/*    <a className="nav-link" href="contact.html">Contact</a>*/}
                        {/*</li>*/}
                    </ul>

                    <div className="navbar-nav ml-auto">
                        <span style={{minWidth: "276px"}}>&nbsp;</span>
                        {/*<form method="post" className="search-form">*/}
                        {/*    <span className="icon ion ion-search"></span>*/}
                        {/*    <input type="text" className="form-control" placeholder="Search..."/>*/}
                        {/*</form>*/}
                    </div>

                </div>
            </div>
        </nav>
    )
}
export default Nav
