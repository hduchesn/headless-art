import React from "react";
import {JahiaCtx} from "../../lib/context";
import PlaceholderBtn from "../jahia/PlaceholderBtn";
import config from "../../jahia";
import PlaceholderNode from "../jahia/PlaceholderNode";
import Image from "../images";
import RichText from "../jahia/RichText";
import classNames from "classnames";


const Default = ({bodyNode,imageNode,imagePosition}) =>{
    const {isEditMode} = React.useContext(JahiaCtx);

    const getImageContent = () => {
        if(isEditMode){
            if(!imageNode){
                return(

                        <PlaceholderBtn path="image" nodetypes={config.cnd_type.HALFBLOCK_IMAGE}/>

                )
            }
            return (
                <PlaceholderNode path={imageNode.path} nodetypes={imageNode.primaryNodeType.name} >
                    <Image id={imageNode.uuid} view={"bubble_1"}/>
                </PlaceholderNode>
            )
        }
        return <Image id={imageNode?.uuid} view={"bubble_1"}/>
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
    //element-animate
    return (
        <section className="section">
            <div className="container">
                <div className="row align-items-center mb-5">
                    {/*<div className="col-lg-7 order-md-2">*/}
                    <div className={classNames("col-lg-7",{
                        "order-md-2": imagePosition?.value==="right"
                    })}>
                        <div className="scaling-image">
                            <div className="frame">
                                {getImageContent()}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 pr-md-5 mb-5">
                        {getBodyContent()}
                        {/*<div className="block-41">*/}
                        {/*    <h2 className="block-41-heading mb-5">Let's Build Together</h2>*/}
                        {/*    <div className="block-41-text">*/}
                        {/*        <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,*/}
                        {/*            there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the*/}
                        {/*            Semantics, a large language ocean.</p>*/}
                        {/*        <p><a href="#" className="readmore">Read More <span*/}
                        {/*            className="ion-android-arrow-dropright-circle"></span></a></p>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Default;

