import {client} from "../../lib/apollo";
import {gql} from "@apollo/client";

const getSitePages = gql`query ($workspace:Workspace!,$query:String!){
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
        query: getSitePages,
        variables:{
            workspace : "LIVE",
            query : `select * from [jnt:page] where isdescendantnode('/sites/${process.env.JAHIA_SITE}')`
        }
    });

    return data?.jcr?.nodesByQuery?.nodes?.map(
        node => {
            return {
                params:{
                    path:node.path
                }
            }
        }
    )
}
