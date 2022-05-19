import React, {useContext, useState} from "react";
import {JahiaCtx} from "@jahia/nextjs-lib";
import {gql, useQuery} from "@apollo/client";
import * as PropTypes from "prop-types";
import {CORE_NODE_FIELDS} from './GQL/fragments';


export function AugmentedSearch({id}) {
    const {workspace, locale} = useContext(JahiaCtx);

    const [searchText, setSearchText] = useState();
    const getContent = gql`query($workspace: Workspace!, $id: String!){
        jcr(workspace: $workspace) {
            workspace
            nodeById(uuid: $id) {
                ...CoreNodeFields
            }
        }
    }
    ${CORE_NODE_FIELDS}`;

    const {data, error, loading} = useQuery(getContent, {
        variables: {
            workspace,
            id,
            language: locale,
        }
    });


    if (loading) {
        return (<>'loading'</>);
    }
    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>
    }

    return (<>
            <form method="post" className="search-form">
                <span className="icon ion ion-search"></span>
                <input type="text" className="form-control" placeholder="Search..."
                       onChange={({target}) => {
                           setSearchText(target.value);
                       }}/>
            </form>
            {searchText && <SearchResults searchText={searchText}/>}
        </>
    )
}

AugmentedSearch.propTypes = {
    id: PropTypes.string.isRequired
};

function SearchResults({searchText}) {
    const searchQuery = gql`query($searchText: String!) {
        search (q: $searchText){
            results {
                hits {
                    displayableName
                    path
                }
            }
        }
    }`
    const {data, error, loading} = useQuery(searchQuery, {
        variables: {
            searchText: searchText
        }
    });

    if (loading) {
        return (<>'loading'</>);
    }
    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>
    }

    return (<>{
        data && data.search.results.hits.map((hit) => {
                return (<>
                    <div>{hit.displayableName}</div>
                    <div>{hit.path}</div>
                </>);
            }
        )
    }</>);
}
