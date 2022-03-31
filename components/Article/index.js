import React from 'react';
import {JahiaCtx} from "../../lib/context";
import {gql, useQuery} from "@apollo/client";
import config from "../../jahia";
import styles from "./index.module.css";
import PlaceholderBtn from "../jahia/PlaceholderBtn";
import PlaceholderNode from "../jahia/PlaceholderNode";
import Image from "./Image";
import RichText from "../jahia/RichText";
import HalfBlock from "./HalfBlock";
import Default from "./Default";

const views = {
    'halfBlock': HalfBlock,
    'default': Default
}


const Article = ({id}) =>{
    const {workspace,isEditMode} = React.useContext(JahiaCtx);
    const [content,setContent] = React.useState({})
    const getContent = gql`query($workspace: Workspace!, $id: String!){
        jcr(workspace: $workspace) {
            workspace
            nodeById(uuid: $id) {
                workspace
                uuid
                name
                imagePosition:property(name:"imagePosition"){
                    value
                }
                view:property(name:"view"){
                    value
                }
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

    useQuery(getContent, {
        variables: {
            workspace,
            id
        },
        onCompleted: data => setContent(data.jcr?.nodeById)
    });


    const getChildNodeOfType = ({node,nodeType}) => {
        if(!Array.isArray(node.children?.nodes))
            return;

        const childArray = node.children.nodes.filter(node =>
            node.primaryNodeType.name === nodeType
        );
        return childArray[0];
    }

    const getImageContent = () => {
        const imageNode = getChildNodeOfType({
            node:content,
            nodeType:config.cnd_type.HALFBLOCK_IMAGE
        });

        if(isEditMode){
            if(!imageNode){
                return(
                    <div className={styles.editImageContainer}>
                        <PlaceholderBtn path="image" nodetypes={config.cnd_type.HALFBLOCK_IMAGE}/>
                    </div>
                )
            }
            return (
                <PlaceholderNode path={imageNode.path} nodetypes={imageNode.primaryNodeType.name} >
                    <Image id={imageNode.uuid}/>
                </PlaceholderNode>
            )
        }
        return <Image id={imageNode?.uuid}/>
    }

    const getBodyContent = () => {
        const bodyNode = getChildNodeOfType({
            node:content,
            nodeType:config.cnd_type.INDUS_TEXT
        });
        if(isEditMode){
            if(!bodyNode){
                return <PlaceholderBtn path="body" nodetypes={config.cnd_type.INDUS_TEXT}/>
            }
            return(
                <PlaceholderNode path={bodyNode.path} nodetypes={bodyNode.primaryNodeType.name}>
                    <RichText id={bodyNode?.uuid}/>
                </PlaceholderNode>
            )
        }
        return <RichText id={bodyNode?.uuid}/>
    }

    const getView = () => {
        if (content?.view?.value && views[content.view.value]) {
            const View = views[content.view.value];
            return (
                <View body={getBodyContent} image={getImageContent} imagePosition={content.imagePosition}/>
            );
        }
        console.log('View not found: ', content?.view?.value)
        return <span>View not found : {content?.view?.value}</span>
    }

    return getView();
}

export default Article;

