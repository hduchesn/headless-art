import React from 'react';
import {JahiaCtx, useNode, getImageURI} from '@jahia/nextjs-sdk';
import * as PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Animate, animateProperties, getAnimateProps} from '@jahia/nextjs-community-components';
// *** Query sample without usage of useNode() ***
// const {workspace, locale} = React.useContext(JahiaCtx);
//
// const getContent = gql`query($workspace: Workspace!, $id: String!,$language:String!){
//     jcr(workspace: $workspace) {
//         workspace
//         nodeById(uuid: $id) {
//             ...CoreNodeFields
//             body: property(language:$language, name:"body"){value}
//             media: property(language:$language,name:"mediaNode",){
//                 node: refNode {
//                     ...CoreNodeFields
//                 }
//             }
//         }
//     }
// }
// ${CORE_NODE_FIELDS}`;
//
// const {data, error, loading} = useQuery(getContent, {
//     variables: {
//         workspace,
//         id,
//         language: locale,
//     }
// });
// const content = data?.jcr?.nodeById;
// const uri = getImageURI({uri: content.media?.node?.path, workspace});

// Note: use xss to clean body
export function Hero({id}) {
    const {workspace} = React.useContext(JahiaCtx);

    const {data, error, loading} = useNode(id, [...animateProperties, 'body', 'mediaNode']);

    if (loading) {
        return 'loading';
    }

    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>;
    }

    const {body, mediaNode} = data.properties;
    const uri = getImageURI({uri: mediaNode?.path, workspace});

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
                            className="text-center pt-5"
                        >
                            <Animate
                                properties={getAnimateProps(data.properties)}
                                dangerouslySetInnerHTML={{__html: body || 'no body'}}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

Hero.propTypes = {
    id: PropTypes.string.isRequired,
};
