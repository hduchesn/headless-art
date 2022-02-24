import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: process.env.JAHIA_BASE_URL + '/modules/graphql',
});

const token = process.env.JAHIA_API_TOKEN

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            Authorization: token ? `APIToken ${token}` : "",
            origin: process.env.JAHIA_BASE_URL
        }
    }
});

console.log("Creating client");

export const inMemoryCache = new InMemoryCache({
    typePolicies: {
        JCRQuery: {
            merge: true,
        },
    },
});

export const client = new ApolloClient({
    ssrMode: true,
    link: authLink.concat(httpLink),
    cache: inMemoryCache
});
