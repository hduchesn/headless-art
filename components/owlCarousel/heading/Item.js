import React from 'react';
import {EmbeddedPathInHtmlResolver, getImageURI, JahiaCtx, useNode} from '@jahia/nextjs-sdk';
// Import {gql, useQuery} from "@apollo/client";
import styles from './item.module.css';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {PlayFill} from 'react-bootstrap-icons';
// eslint-disable-next-line no-unused-vars
import {Fancybox} from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox.css';
import {Animate, animateProperties, getAnimateProps} from '@jahia/nextjs-community-components';

// *** Query sample without usage of useNode() ***
// const {workspace, isEditMode, locale} = React.useContext(JahiaCtx);
// const getContent = gql`query($workspace: Workspace!, $id: String!,$language:String!){
//     jcr(workspace: $workspace) {
//         workspace
//         nodeById(uuid: $id) {
//             ...CoreNodeFields
//             caption: property(language:$language, name:"caption"){value}
//             videoLink: property(name:"videoLink"){value}
//             videoExtPath: property(language:$language,name:"videoExtPath"){value}
//             videoIntPath: property(language:$language,name:"videoIntPath"){
//                 node: refNode {
//                     ...CoreNodeFields
//                 }
//             }
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

// Note : use xss to clean caption

function Item({id}) {
    const {workspace, isEditMode} = React.useContext(JahiaCtx);

    const {data, error, loading} = useNode(id, [...animateProperties, 'caption', 'videoExtPath', 'videoIntPath', 'mediaNode']);

    if (loading) {
        return 'loading';
    }

    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>;
    }

    const {caption, videoExtPath, videoIntPath, mediaNode} = data.properties;

    const imageURI = getImageURI({uri: mediaNode?.path, workspace});
    const videoLink = videoIntPath
        ? getImageURI({uri: videoIntPath.path, workspace})
        : videoExtPath;

    return (
        <>
            {isEditMode
                && <div className={classNames(
                    'card',
                    styles.jOwlCarouselEditCardEdit,
                )}
                   >
                    <img
                        src={imageURI}
                        className="card-img-top"
                        alt={mediaNode?.name}
                    />
                    <div className={styles.cardBody}>
                        <EmbeddedPathInHtmlResolver htmlAsString={caption || 'no caption'}/>
                    </div>
                    {/* eslint-disable-next-line  react/jsx-closing-tag-location */}
                </div>}
            {!isEditMode
                && <div
                    className="slider-item"
                    style={{backgroundImage: `url('${imageURI}')`}}
                   >
                    <Container>
                        <Row className="slider-text align-items-center justify-content-center">
                            <Animate
                                properties={getAnimateProps(data.properties)}
                                component={Col}
                                sm={12}
                                lg={7}
                                className="text-center"
                            >

                                {videoLink
                                    && <div className="btn-play-wrap mx-auto">
                                        <p className="mb-4">
                                            <a
                                                data-fancybox
                                                href={videoLink}
                                                data-ratio="2"
                                                className="btn-play"
                                            >
                                                <PlayFill/>
                                            </a>

                                        </p>
                                        {/* eslint-disable-next-line  react/jsx-closing-tag-location */}
                                    </div>}
                                <EmbeddedPathInHtmlResolver htmlAsString={caption || 'no caption'}/>
                            </Animate>
                        </Row>
                    </Container>
                    {/* eslint-disable-next-line  react/jsx-closing-tag-location */}
                </div>}
        </>

    );
}

Item.propTypes = {
    id: PropTypes.string.isRequired,
};

export default Item;
