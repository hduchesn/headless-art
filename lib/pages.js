import {getClient} from "./apollo";
import {gql} from "@apollo/client";
import { CORE_NODE_FIELDS } from '../components/jahia/GQL/fragments';

const gqlGetSitePages = gql`query ($workspace:Workspace!,$query:String!,$language:[String]){
        jcr(workspace: $workspace) {
            workspace
            nodesByQuery(query:$query, queryLanguage:SQL2) {
                nodes{
                    ...CoreNodeFields
                    vanityUrls(languages:$language){
                        workspace
                        uuid
                        url
                        language
                    }
                }
            }
        }
    }
    ${CORE_NODE_FIELDS}`;

export async function getAllPages(language) {
    const {data} = await getClient().query({
        query: gqlGetSitePages,
        variables: {
            // by default we consider that we build the website for the live workspace
            // we should criteria j:published equals true ?
            // we will fallback pages for edit ?
            workspace: "LIVE",//"EDIT"
            query: `select * from [jnt:page] where isdescendantnode('/sites/${process.env.NEXT_PUBLIC_JAHIA_SITE}')`,
            language
        }
    });
    const nodes = data?.jcr?.nodesByQuery?.nodes;

    // console.log("[getAllPages] data :",data)
    if (!Array.isArray(nodes)) {
        return [];
    }


    const paths = nodes.map(node => {
        const slugs = node.vanityUrls?.reduce((ret, item) => {
            ret[item.language] = item.url;
            return ret;
        }, {});

        return language.map(locale => {
            // const slug = slugs[locale] || node.path;
            const slug = node.path;
            const slugArray = slug.substr(1, slug.length).split("/");
            // console.log("[getAllPages] slug : ",slug);
            // console.log("[getAllPages] slugArray : ",slugArray);
            // path:node.path
            return {params: {slug: slugArray}, locale}
        })
    }).flat()

    // console.log("[getAllPages] paths : ",paths);
    return paths;

    // return data?.jcr?.nodesByQuery?.nodes?.map(
    //     node => {
    //         console.log("[getAllPages] node :",node)
    //         return node.path
    //     }
    // )


    // return data?.jcr?.nodesByQuery?.nodes?.map(
    //     node => {
    //         // console.log("[getAllPages] node :",node)
    //         // return {
    //         //     params:{
    //         //         path:node.path
    //         //     }
    //         // }
    //     }
    // )
}

const gqlGetPageInfo = gql`query($workspace:Workspace!,$path:String!) {
        jcr(workspace:$workspace) {
            workspace
            nodeByPath(path:$path) {
                ...CoreNodeFields
                templateName : property(name:"j:templateNameHeadless") { value }
            }
        }
    }
    ${CORE_NODE_FIELDS}`;

export async function getPageInfo(client, path, workspace) {
    return await client.query({
        query: gqlGetPageInfo,
        variables: {
            workspace: workspace || "LIVE",
            path
        }
    });
}
