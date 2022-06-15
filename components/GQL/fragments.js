import {gql} from "@apollo/client";
// import { CORE_NODE_FIELDS } from '../jahia/GQL/fragments';

export const LINK_TO_FIELDS = gql`
    fragment LinkToFields on JCRNode {
        linkType: property(name:"linkType"){value}
        linkTarget: property(name:"linkTarget"){value}
        externalLink: property(name:"externalLink"){value}
        internalLink: property(name:"internalLink"){
            node: refNode {
                ...CoreNodeFields
            }
        }
    }`;
    // ${CORE_NODE_FIELDS}`;
