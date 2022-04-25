import {gql} from "@apollo/client";
import { CORE_NODE_FIELDS } from '../jahia/GQL/fragments';

export const queryCarousel = gql`query (
        $workspace:Workspace!,
        $id: String!) {
        jcr(workspace: $workspace) {
            workspace
            nodeById(uuid:$id) {
                ...CoreNodeFields
                mixins:mixinTypes{ name }
                carouselType:property(name:"carouselType") { value }
                options:property(name:"options") { value }
                class:property(name:"class") { value }
                children{
                    nodes{
                        ...CoreNodeFields
                    }
                }
            }
        }
    }
    ${CORE_NODE_FIELDS}`;
