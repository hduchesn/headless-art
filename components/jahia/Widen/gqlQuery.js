import {gql} from "@apollo/client";


export const queryWidenRef = gql`query (
        $workspace:Workspace!,
        $id: String!
    ){
        jcr(workspace: $workspace) {
            workspace
            nodeById(uuid:$id) {
                ...CoreNodeFields
                defaultImageSize:property(name:"wden:defaultImageSize"){
                    value:longValue
                }
                imageSizes:property(name:"wden:imageSizes"){
                    value:longValues
                }
                pdfMinHeight:property(name:"wden:pdfMinHeight"){
                    value:longValue
                }
                referenceView:property(name:"j:referenceView"){
                    value:longValue
                }
                
                node:property(name:"j:node",){
                    refNode {
                        ...CoreNodeFields
                    }
                }
            }
        }
    }
    fragment CoreNodeFields on JCRNode {
        workspace
        uuid
        path
        name
        primaryNodeType {name}
    }`;
