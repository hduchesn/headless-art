import React from "react";
import {JahiaCtx} from "../../../lib/context";
import {gql, useQuery} from "@apollo/client";
import {getImageURI} from "../../../lib/utils";
import styles from './item.module.css'
import classNames from 'classnames';
import * as PropTypes from "prop-types";

//TODO use xss to clean caption

function Item({id}) {
    const {workspace, isEditMode, locale} = React.useContext(JahiaCtx);
    const [content, setContent] = React.useState({})

    // console.log("[Item] isEditMode :",isEditMode);

    const getContent = gql`query($workspace: Workspace!, $id: String!,$language:String!){
        jcr(workspace: $workspace) {
            workspace
            nodeById(uuid: $id) {
                workspace
                uuid
                name
                caption: property(language:$language, name:"caption"){
                    value
                }
                videoLink: property(name:"hic:videoLink"){
                    value
                }
                videoExtPath: property(language:$language,name:"hic:videoExtPath"){
                    value
                }
                videoIntPath: property(language:$language,name:"hic:videoIntPath"){
                    refNode {
                        workspace
                        uuid
                        primaryNodeType{
                            name
                        }
                        path
                    }
                }
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
            language: locale,
        },
        onCompleted: data => setContent(data.jcr?.nodeById)
    });

    // console.log("[Item] image path :",content.media?.refNode?.path);
    // <div className="slider-item" style="background-image: url('/img/industrial_hero_1');">
    // element-animate

    // console.log("[owl Heading Item] content :",content);
    return (
        <>
            {isEditMode &&
                <div className={classNames(
                    "card",
                    styles.jOwlCarouselEditCardEdit
                )}
                >
                    <img
                        className="card-img-top"
                        src={getImageURI({uri: content.media?.refNode?.path, workspace})}
                        alt="Card image cap"
                    />
                    {/* eslint-disable-next-line react/no-danger */}
                    <div dangerouslySetInnerHTML={{__html: content.caption?.value}} className={styles.cardBody}/>
                </div>}
            {!isEditMode &&
                <div
                    className="slider-item"
                    style={{backgroundImage: `url('${getImageURI({uri: content.media?.refNode?.path, workspace})}')`}}
                >
                    <div className="container">
                        <div className="row slider-text align-items-center justify-content-center">
                            <div className="col-lg-7 text-center col-sm-12 ">
                                <div className="btn-play-wrap mx-auto">
                                    <p className="mb-4">
                                        <a
                                            data-fancybox
                                            href="https://vimeo.com/59256790"
                                            data-ratio="2"
                                            className="btn-play"
                                        >
                                            <span className="ion ion-ios-play"/>
                                        </a>
                                    </p>
                                </div>
                                {/* eslint-disable-next-line react/no-danger */}
                                <div dangerouslySetInnerHTML={{__html: content.caption?.value}}/>
                            </div>
                        </div>
                    </div>
                </div>}
        </>

    )
}

Item.propTypes = {
    id : PropTypes.string.isRequired
};

export default Item;
