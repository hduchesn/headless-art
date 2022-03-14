import {gql} from "@apollo/client";


export const queryHalfBlock = gql`query (
    $workspace:Workspace!,
    $id: String!,
    $mainResourcePath: String,
    $language:String,
    $isEditMode: Boolean) {
    jcr(workspace: $workspace) {
        workspace
        nodeById(uuid:$id) {
            renderedContent(
                mainResourcePath: $mainResourcePath,
                language: $language,
                isEditMode:$isEditMode) {
                output
            }
            workspace
            uuid
            name
            path
            carouselType:property(name:"carouselType") {
                value
            }
            options:property(name:"options") {
                value
            }
            class:property(name:"class") {
                value
            }
            children{
                items:nodes{
                    workspace
                    uuid
                    path
                    primaryNodeType{name}
                }
            }
        }
    }
}`;
