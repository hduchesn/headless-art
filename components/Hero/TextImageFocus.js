import React from 'react';
import * as PropTypes from 'prop-types';
import {JahiaCtx, useNode, getImageURI} from '@jahia/nextjs-sdk';
import {Container,Row,Col} from 'react-bootstrap';
import {Animate, animateProperties, getAnimateProps} from '@jahia/nextjs-community-components';
import {DefaultImage} from "@jahia/nextjs-sdk";
import styles from './textImageFocus.module.css'
import classNames from "classnames";
import {Image} from "react-bootstrap-icons";
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
export function TextImageFocus({id}) {
    const {workspace} = React.useContext(JahiaCtx);

    const {data, error, loading} = useNode(id, [...animateProperties, 'body', 'mediaNode','mediaNodeFocus']);

    if (loading) {
        return 'loading';
    }

    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>;
    }

    const {body, mediaNode, mediaNodeFocus} = data.properties;
    const uri = getImageURI({uri: mediaNode.path, workspace});

    // <div className="container pb-5">
    //     <div className="row py-5 align-items-center">
    //         <div className="col-lg-6">
    //             <h5 className="display-4 mb-4 font-weight-bold text-white">A modular UI Kit for Bootstrap</h5>
    //             <div className="d-flex star-rating mb-5"><a href=""><i className="lni lni-star-filled"></i></a> <a
    //                 href=""><i className="lni lni-star-filled"></i></a> <a href=""><i
    //                 className="lni lni-star-filled"></i></a> <a href=""><i className="lni lni-star"></i></a> <a href=""><i
    //                 className="lni lni-star"></i></a></div>
    //             <p className="h5 aa mb-4 pb-3 text-white-50">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    //                 Curabitur nunc nisi, suscipit id dapibus sit amet, lacinia nec lorem. Aenean eget urna rutrum
    //                 suscipit.</p>
    //             <h3 className="text-white mb-5">5.20$</h3>
    //             <div className="d-flex">
    //                 <a href="" className="btn btn-lg btn-danger mr-2"><i className="lni lni-apple mr-2"></i> Download
    //                     for IOS</a>
    //                 <a href="" className="btn btn-lg btn-danger"><i className="lni lni-play-store mr-2"></i> Download
    //                     for Android</a>
    //             </div>
    //         </div>
    //         <div className="col-lg-6 text-lg-right text-center mt-5 mt-lg-0">
    //             <div className="banner-phone-image"><img src="img/Iphone-X.png"></div>
    //         </div>
    //     </div>
    // </div>

    return (
        <div className="inner-page">
            <div
                className={classNames("slider-item",styles.sliderItemFocus)}
                style={{backgroundImage: `url('${uri}')`}}
            >
                <Container className={classNames("pb-5",styles.containerFocus)}>
                    <Row className="align-items-center">
                        <Col lg="7" className={classNames("text-center",styles.textFocus)}>
                            <Animate
                                properties={getAnimateProps(data.properties)}
                                dangerouslySetInnerHTML={{__html: body || 'no body'}}
                            />
                        </Col>
                        <Col lg="5" className="text-lg-right text-center mt-5 mt-lg-0">
                            <div className={styles.imageBorder}>
                                {mediaNodeFocus &&
                                <DefaultImage
                                    path={mediaNodeFocus.path}
                                    className={classNames("img-fluid",styles.imageFocus)}
                                />
                                }
                                {!mediaNodeFocus &&
                                <div className="p-5">
                                    <Image/>
                                    <p><b>Focus Image</b> must be filled</p>
                                </div>

                                }
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

TextImageFocus.propTypes = {
    id: PropTypes.string.isRequired,
};
