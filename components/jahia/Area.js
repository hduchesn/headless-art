import React from "react";
import {gql, useQuery} from "@apollo/client";
import {getBoolean, getJahiaDivsProps} from "../../lib/utils";


const Area = ({name, mainResourcePath, isEdit, locale, components, path}) => {
    const [divs, setDivs] = React.useState([]);
    const [area, setArea] = React.useState({});
    const isEditMode = getBoolean(isEdit);
// console.log("[Area] components: ",components);
    const getRenderedContent = gql`query (
        $pathArea: String!,
        $mainResourcePath: String,
        $path: String,
        $language: String,
        $node: InputJCRNode,
        $isEditMode: Boolean) {
        # npm is used to create jahia area if needed and return jahia HTML tags for the edit mode       
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
            workspace
            nodeByPath(path:$pathArea) {
                workspace
                uuid
                name
                path
                children{
                    nodes{
                        workspace
                        uuid
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
            isEditMode
        },
        onCompleted: data =>{
            // console.log("[Area] data :",data)
            setDivs(getJahiaDivsProps(data.npm?.renderedComponent?.output));
            setArea(data.jcr?.nodeByPath);
        }
    })

    const showChildren = () =>{
        if(!area.children?.nodes)
            return <>loading</>;

        return area.children.nodes.map(node =>{
            if (components[node.primaryNodeType.name]){
                const Component = components[node.primaryNodeType.name];

                if(isEditMode)
                    return(
                        <div key={node.uuid} {...divs[node.path]}>
                            <Component id={node.uuid}
                                       path={node.path}
                                       mainResourcePath={mainResourcePath}
                                       locale={locale}
                                       isEdit={isEdit}/>
                        </div>
                    )

                return <Component key={node.uuid}
                                  id={node.uuid}
                                  path={node.path}
                                  mainResourcePath={mainResourcePath}
                                  locale={locale}
                                  isEdit="false"/>
            }
            return (
                <div key={node.uuid}>Unknown rendering for : {node.name} - {node.primaryNodeType.name}</div>
            )
        });
    }
// console.log("[Area] resolve area : ",name);
    return(
        <>
            {isEditMode &&
                <div {...divs[area.path]}>
                    {showChildren()}

                    {/*Jahia btn placeholder*/}
                    <div {...divs["*"]}></div>
                </div>
            }
            {!isEditMode &&
                showChildren()
            }
        </>

    )

}

export default Area;
