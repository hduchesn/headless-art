import {gql} from "@apollo/client";


export const queryImage = gql`query($workspace: Workspace!, $id: String!,$language:String!){
    jcr(workspace: $workspace) {
        workspace
        nodeById(uuid: $id) {
            workspace
            uuid
            name
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
