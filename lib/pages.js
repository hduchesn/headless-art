import {client} from "./apollo";
import {gql} from "@apollo/client";

const gqlGetSitePages = gql`query ($workspace:Workspace!,$query:String!){
    jcr(workspace: $workspace) {
        nodesByQuery(query:$query, queryLanguage:SQL2) {
            nodes{
                path
                template : property(name:"j:templateName") {
                    value
                }
            }
        }
    }
}`;

export async function getAllPages(){
    const {data} = await client.query({
        query: gqlGetSitePages,
        variables:{
            workspace : "EDIT",//"LIVE",
            query : `select * from [jnt:page] where isdescendantnode('/sites/${process.env.JAHIA_SITE}')`
        }
    });
    // console.log("[getAllPages] data :",data)
    if(!Array.isArray(data?.jcr?.nodesByQuery?.nodes))
        return [];

    return data?.jcr?.nodesByQuery?.nodes?.map(
        node => {
            console.log("[getAllPages] node :",node)
            return node.path
        }
    )

    // return data?.jcr?.nodesByQuery?.nodes?.map(
    //     node => {
    //         console.log("[getAllPages] node :",node)
    //         return {
    //             params:{
    //                 path:node.path
    //             }
    //         }
    //     }
    // )
}

const gqlGetPageInfo = gql`query($path:String!) {
    jcr {
        nodeByPath(path:$path) {
            id: uuid
            name
            path
            templateName: property(name:"j:templateName") {
                value
            }
        }
    }
}`;

export async function getPageInfo(path){
    const {data} = await client.query({
        query: gqlGetPageInfo,
        variables: {path}
    });
    return data;
}
