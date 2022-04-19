import {gql} from "@apollo/client";
import { CORE_NODE_FIELDS } from '../jahia/GQL/fragments';

export const queryCarousel = gql`query (
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
                ...CoreNodeFields
                carouselType:property(name:"carouselType") { value }
                options:property(name:"options") { value }
                class:property(name:"class") { value }
                children{
                    items:nodes{
                        ...CoreNodeFields
                    }
                }
            }
        }
    }
    ${CORE_NODE_FIELDS}`;
