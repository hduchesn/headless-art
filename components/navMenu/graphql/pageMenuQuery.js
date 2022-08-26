import {gql} from '@apollo/client';
import {CORE_NODE_FIELDS} from '@jahia/nextjs-sdk';

export const pageMenuQuery = ({baselineNode, startLevel}) => {

};

gql`query(
    $workspace: Workspace!,
    $base: String!,
    $language: String!,
    $title:String!,
    $MenuItem:[String]!
    $isLevel3:Boolean!) {

    jcr(workspace: $workspace) {
        workspace
        # first node is site level
        nodeByPath(path: $base) {
            ...CoreNodeFields
            children(fieldFilter:{filters:{fieldName:"page", value:"true"}}) {
                # Home Page level
                nodes {
                    ...CorePageNodeFields
                    isHomePage : property(name:"j:isHomePage") {
                        value
                    }
                    children(fieldFilter:{filters:{fieldName:"page", value:"true"}}) {
                        # Home Page sub-level 
                        nodes {
                            ...CorePageNodeFields
                            # Home Page sub-sub-level
                            children(fieldFilter:{filters:{fieldName:"page", value:"true"}}) @include(if: $isLevel3) {
                                # Home Page sub-level 
                                nodes {
                                    ...CorePageNodeFields
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
fragment CorePageNodeFields on JCRNode {
    ...CoreNodeFields
    page: isNodeType(type: {types:$MenuItem})
    title: property(name: $title, language: $language) { value }
}
${CORE_NODE_FIELDS}`;
