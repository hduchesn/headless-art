import React from "react";
import {JahiaCtx} from "../../../lib/context";
import {gql, useQuery} from "@apollo/client";
import styles from './item.module.css'
import classNames from 'classnames';
import * as PropTypes from "prop-types";
import { CORE_NODE_FIELDS } from '../../jahia/GQL/fragments';
import {getImageURI} from "../../jahia/utils";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//TODO use xss to clean caption

function Item({id}) {
    const {workspace, isEditMode, locale} = React.useContext(JahiaCtx);
    // const [content, setContent] = React.useState({})

    // console.log("[Item] isEditMode :",isEditMode);

    const getContent = gql`query($workspace: Workspace!, $id: String!,$language:String!){
        jcr(workspace: $workspace) {
            workspace
            nodeById(uuid: $id) {
                ...CoreNodeFields
                caption: property(language:$language, name:"caption"){value}
                videoLink: property(name:"hic:videoLink"){value}
                videoExtPath: property(language:$language,name:"hic:videoExtPath"){value}
                videoIntPath: property(language:$language,name:"hic:videoIntPath"){
                    node: refNode {
                        ...CoreNodeFields
                    }
                }
                media: property(language:$language,name:"wden:mediaNode",){
                    node: refNode {
                        ...CoreNodeFields
                        templatedUrl:property(name:"wden:templatedUrl"){value}
                    }
                }
            }
        }
    }
    ${CORE_NODE_FIELDS}`;

    const {data, error, loading} = useQuery(getContent, {
        variables: {
            workspace,
            id,
            language: locale,
        },
        // onCompleted: data => setContent(data.jcr?.nodeById)
    });

    if (loading) {
        return "loading";
    }
    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>
    }

    const content = data?.jcr?.nodeById;
    const imageURI =
        content.media?.node?.templatedUrl?.value
            ?.replace("{size}",widenURIProps.size)
            .replace("{scale}",widenURIProps.scale)
            .replace("{quality}",widenURIProps.quality) ||
        getImageURI({uri: content.media?.node?.path, workspace});
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
                        src={imageURI}
                        className="card-img-top"
                        alt={content.media?.node?.name}
                    />
                    {/* eslint-disable-next-line react/no-danger */}
                    <div dangerouslySetInnerHTML={{__html: content.caption?.value}} className={styles.cardBody}/>
                </div>}
            {!isEditMode &&
                <div
                    className="slider-item"
                    style={{backgroundImage: `url('${imageURI}')`}}
                >
                    <Container>
                        <Row className="slider-text align-items-center justify-content-center">
                            <Col
                                sm={12}
                                lg={7}
                                className={classnames("text-center")}
                            >
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
                                <div dangerouslySetInnerHTML={{__html: content.caption?.value || "no caption"}}/>
                            </Col>
                        </Row>
                    </Container>
                </div>}
        </>

    )
}

Item.propTypes = {
    id : PropTypes.string.isRequired
};

export default Item;
