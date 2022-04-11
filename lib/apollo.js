import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_JAHIA_BASE_URL + '/modules/graphql',
});

const token = process.env.JAHIA_API_TOKEN

const authLink = setContext((_, {headers}) => {
    //create props object and don't use directly headers in case headers is null or undefined or not an object
    const props = {};
    if(token)
        props.Authorization = `APIToken ${token}`;

    return {
        headers: {
            ...headers,
            ...props,
            origin: process.env.NEXT_PUBLIC_JAHIA_BASE_URL
        }
    }
});

export const inMemoryCache = new InMemoryCache({
    typePolicies: {
        JCRNode: {
            keyFields: ['uuid', 'workspace']
        },
        JCRQuery: {
            keyFields: ["workspace"],
        },
        GqlNpmHelper: {
            keyFields: [],
        },
    },
    possibleTypes : {
        JCRNode: ['JCRNode', 'GenericJCRNode', 'JCRSite', 'VanityUrl'],
    }
});

console.log("Creating client");
export const client = new ApolloClient({
    ssrMode: true,
    link: authLink.concat(httpLink),
    cache: inMemoryCache
});
