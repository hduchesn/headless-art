import React from 'react';
import styles from './halfBlock.module.css'
import classNames from "classnames";
import {JahiaCtx} from "../../lib/context";
import PlaceholderBtn from "../jahia/PlaceholderBtn";
import PlaceholderNode from "../jahia/PlaceholderNode";
import Image from "../images";
import RichText from "../jahia/RichText";
import config from "../../jahia";

const HalfBlock = ({bodyNode,imageNode,imagePosition}) => {
    const {isEditMode} = React.useContext(JahiaCtx);
    const getImageContent = () => {
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
                    <Image id={imageNode.uuid} view={"halfBlock"}/>
                </PlaceholderNode>
            )
        }
        return <Image id={imageNode?.uuid} view={"halfBlock"}/>
    }

    const getBodyContent = () => {
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


    return (
        <section>
            <div className="half d-lg-flex d-block">
                <div className={classNames("image",{
                    "order-2": imagePosition?.value==="right",
                    [styles.editImageWrapper]:isEditMode
                })}>
                    {getImageContent()}
                </div>

                <div className="text text-center">
                    {getBodyContent()}
                </div>
            </div>
        </section>
    )
}

export default HalfBlock;
