import React from 'react';
import {gql, useQuery} from "@apollo/client";
import {JahiaCtx} from "../../lib/context";
import {getImageURI} from "../../lib/utils";
import classNames from "classnames";
import styles from "./image.module.css";

const Image = ({id}) =>{
    const {workspace,locale} = React.useContext(JahiaCtx);
    const [image,setImage] = React.useState({})
    const getContent = gql`query($workspace: Workspace!, $id: String!,$language:String!){
        jcr(workspace: $workspace) {
            workspace
            nodeById(uuid: $id) {
                workspace
                uuid
                name
                media: property(language:$language,name:"wden:mediaNode",){
                    refNode {
                        workspace
                        uuid
                        primaryNodeType{
                            name
                        }
                        mixinTypes{
                            name
                        }
                        path
                    }
                }
            }
        }
    }`;
    useQuery(getContent, {
        variables: {
            workspace,
            id,
            language:locale
        },
        onCompleted: data => setImage(data.jcr?.nodeById)
    });

    return <div className={classNames("image-display",styles.image)} style={{backgroundImage: `url('${getImageURI({uri:image.media?.refNode?.path,workspace})}')`}}></div>
}

export default Image;
