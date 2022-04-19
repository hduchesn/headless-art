import React from "react";
import {JahiaCtx} from "../lib/context";
import {gql, useQuery} from "@apollo/client";
import * as PropTypes from "prop-types";
import { CORE_NODE_FIELDS } from './jahia/GQL/fragments';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import classnames from "classnames";
// import {getImageURI} from "../lib/utils";
import {getImageURI} from "./jahia/utils";
const widenURIProps = {
    size:1280,
    scale:1,
    quality:72
}

//TODO use xss to clean body
function Hero({id}) {
    const {workspace, locale} = React.useContext(JahiaCtx);

    const getContent = gql`query($workspace: Workspace!, $id: String!,$language:String!){
        jcr(workspace: $workspace) {
            workspace
            nodeById(uuid: $id) {
                ...CoreNodeFields
                body: property(language:$language, name:"body"){value}
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
        }
    });

    if (loading) {
        return "loading";
    }
    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>
    }

    const content = data?.jcr?.nodeById;
    const uri =
        content.media?.node?.templatedUrl?.value
            ?.replace("{size}",widenURIProps.size)
            .replace("{scale}",widenURIProps.scale)
            .replace("{quality}",widenURIProps.quality) ||
        getImageURI({uri: content.media?.node?.path, workspace});

    // {
    //     "element-animate":!isEditMode
    // }
    return (

        <div className="inner-page">
            <div
                className="slider-item"
                style={{backgroundImage: `url('${uri}')`}}
            >
                <Container>
                    <Row className="slider-text align-items-center justify-content-center">
                        <Col
                            sm={12}
                            md={8}
                            className={classnames("text-center","pt-5")}
                            dangerouslySetInnerHTML={{__html: content.body?.value || 'no body'}}/>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

Hero.propTypes = {
    id: PropTypes.string.isRequired
};
export default Hero;
