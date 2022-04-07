import React from 'react';
import {JahiaCtx} from "../../lib/context";
import {gql, useQuery} from "@apollo/client";
import config from "../../jahia";
import HalfBlock from "./HalfBlock";
import Default from "./Default";

const views = {
    'halfBlock': HalfBlock,
    'default': Default
}


const Article = ({id}) => {
    const {workspace} = React.useContext(JahiaCtx);
    const [content, setContent] = React.useState({})
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


    const getChildNodeOfType = ({node, nodeType}) => {
        if (!Array.isArray(node.children?.nodes)) {
            return;
        }

        const childArray = node.children.nodes.filter(node =>
            node.primaryNodeType.name === nodeType
        );
        return childArray[0];
    }

    const imageNode = getChildNodeOfType({
        node: content,
        nodeType: config.cnd_type.HALFBLOCK_IMAGE
    });

    const bodyNode = getChildNodeOfType({
        node: content,
        nodeType: config.cnd_type.INDUS_TEXT
    });

    const getView = () => {
        let View = views["default"];
        if (content?.view?.value && views[content.view.value]) {
            View = views[content.view.value];
        } else {
            console.warn(`Article View not found: ${content?.view?.value}; use default`)
        }

        return (
            <View bodyNode={bodyNode} imageNode={imageNode} imagePosition={content.imagePosition}/>
        );
    }

    return getView();
}

export default Article;

