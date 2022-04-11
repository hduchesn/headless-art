import React from 'react';
import {JahiaCtx} from "../../lib/context";
import {gql, useQuery} from "@apollo/client";
import cms from "../../jahia";
import HalfBlock from "./HalfBlock";
import Default from "./Default";
import * as PropTypes from "prop-types";

const views = {
    'halfBlock': HalfBlock,
    'default': Default
}

function Article({id}) {
    const {workspace} = React.useContext(JahiaCtx);
    // const [content, setContent] = React.useState({})
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

    const {data, error, loading} = useQuery(getContent, {
        variables: {
            workspace,
            id
        },
        // onCompleted: data => setContent(data.jcr?.nodeById)
    });
    const content = data?.jcr?.nodeById;

    if (loading) {
        return "loading";
    }
    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>
    }

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
        nodeType: cms.contentTypes.HALFBLOCK_IMAGE
    });

    const bodyNode = getChildNodeOfType({
        node: content,
        nodeType: cms.contentTypes.INDUS_TEXT
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

Article.propTypes = {
    id: PropTypes.string.isRequired
};
export default Article;

