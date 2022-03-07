import React from "react";
import {gql, useQuery} from "@apollo/client";
import { parse } from 'node-html-parser';
import RichText from "./text/RichText";
import Hero from "./Hero";

const components = {
    'jnt:bigText': RichText,
    // 'news': News,
    'hicnt:heading': Hero,
    // '2-column': TwoColumns
}

const Areaj = ({name, mainResourcePath, path}) => {
    const [divs, setDivs] = React.useState([]);
    const [area, setArea] = React.useState({});


    const getRenderedContent = gql`query ($pathArea:String!,$mainResourcePath: String, $path: String, $language: String, $node: InputJCRNode, $isEditMode: Boolean) {
        npm {
            renderedComponent(
                mainResourcePath:$mainResourcePath,
                path: $path,
                language: $language,
                view: "default",
                templateType: "html",
                node: $node,
                isEditMode: $isEditMode) {
                id
                output
            }
        }
        jcr {
            nodeByPath(path:$pathArea) {
                id: uuid
                name
                path
                children{
                    nodes{
                        id: uuid
                        path
                        primaryNodeType{name}
                    }
                }
            }
        }
    }`;

    // const area = useQuery(getRenderedContent, {
    useQuery(getRenderedContent, {
        variables: {
            pathArea:`${mainResourcePath}/${name}`,
            node: {
                name,
                primaryNodeType: "jnt:area"
            },
            language: "en",
            path:"/",
            mainResourcePath,
            isEditMode: true
        },
        onCompleted: data =>{
            console.log("[Areaj] data :",data)
            const html = parse(data.npm?.renderedComponent?.output);
            setDivs(
                html?.getElementsByTagName('div')
                .reduce((map,div) => {
                    const path = div.getAttribute('path');
                    if(path)
                        map[path]=div.attributes;
                    return map;
                },{})
            )
            setArea(data.jcr?.nodeByPath);
        }


    })


//TODO faire une boucle sur les noeud jcr et pour chacun mettre un div autour avec les attr qui vont bien et faire un mapping avec un composant local
//     en fonction du type de noeud

    // console.log("[Areaj] all div",dom?.getElementsByTagName('div'));
    // <div className="jahia-template-gxt"
    //      jahiatype="module"
    //      id="module82ba3a6d-3cf4-43b2-8932-0d45836a3d15"
    //      type="area"
    //      scriptInfo="Path dispatch: /modules/default/8.5.0-SNAPSHOT/jmix_list/html/list.jsp"
    //      path="/sites/headless-industrial/home/testArea"
    //      nodetypes="jmix:droppableContent"
    //      allowReferences="true"
    //      referenceTypes="jnt:fileReference[jnt:file] jnt:fileI18nReference[jnt:file] jnt:contentReference[jmix:droppableContent] jnt:contentFolderReference[jnt:contentFolder] jnt:portletReference[jnt:portlet] jnt:imageReferenceLink[jmix:image] jnt:imageReference[jmix:image] jnt:nodeLinkImageReference[jmix:image] jnt:nodeLinkI18nImageReference[jmix:image] jnt:externalLinkImageReference[jmix:image] jnt:externalLinkI18nImageReference[jmix:image] jnt:imageI18nReference[jmix:image] wdennt:widenReference[wdenmix:widenAsset]"
    //      showAreaButton="false">
    //     {children}
    // </div>
    console.log("[Areaj] divs",divs);
    console.log("[Areaj] area",area);

    const showChildren = () =>{
        if(!area.children?.nodes)
            return <>loading</>;
        console.log("[Areaj] area.children.nodes : ",area.children.nodes);
        return  area.children.nodes.map(node =>{
                console.log("[Areaj] node",node)
                return (<div key={node.id} {...divs[node.path]}>
                            <p>{node.primaryNodeType.name}</p>
                        </div>)
        })
    }
    return(
        <div {...divs[area.path]}>
            <h2>Je suis l area</h2>
            {
                area.children?.nodes && area.children.nodes.map(node =>{
                    const Component = components[node.primaryNodeType.name];
                    return(<div key={node.id} {...divs[node.path]}>
                        <Component id={node.id} path={node.path}/>
                    </div>)
                })
            }
            <div {...divs["*"]}></div>
        </div>
    )
}


export default Areaj;
