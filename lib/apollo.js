import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import jahia from'../jahia';

const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_JAHIA_BASE_URL + '/modules/graphql',
    // uri: jahia.baseUrl + '/modules/graphql',
});

// const token = process.env.JAHIA_API_TOKEN
const token = jahia.token;

const authLink = setContext((_, { headers }) => {
    // console.log("Creating authLink");
    // get the authentication token from local storage if it exists
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            Authorization: token ? `APIToken ${token}` : "",
            // origin: jahia.baseUrl
            origin:process.env.NEXT_PUBLIC_JAHIA_BASE_URL
        }
    }
});

export const inMemoryCache = new InMemoryCache({
    typePolicies: {
        JCRQuery: {
            keyFields: ["workspace"],
            // merge: true,
        },
        GenericJCRNode:{
            keyFields: ["workspace","uuid"],
        },
        GqlNpmHelper: {
            keyFields: [],
            // merge: true,
        },
    },
});

console.log("Creating client");
export const client = new ApolloClient({
    ssrMode: true,
    link: authLink.concat(httpLink),
    cache: inMemoryCache
});
