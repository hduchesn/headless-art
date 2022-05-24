import React from "react";
import * as PropTypes from "prop-types";
import {JahiaCtx} from "@jahia/nextjs-lib";
import {gql, useQuery} from "@apollo/client";
import { CORE_NODE_FIELDS } from './jahia/GQL/fragments';

function Blog({id}) {
    const {workspace, locale} = React.useContext(JahiaCtx);

    const getContent = gql`query($workspace: Workspace!, $id: String!,$language:String!){
        jcr(workspace: $workspace) {
            workspace
            nodeById(uuid: $id) {
                ...CoreNodeFields
                title: property(language:$language, name:"title"){value}
                teaser: property(language:$language, name:"teaser"){value}
                releaseDate: property(name:"releaseDate"){value}
                body: property(language:$language, name:"body"){value}
                image: property(language:$language,name:"image",){
                    node: refNode {
                        ...CoreNodeFields
                    }
                }
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
        return "loading";
    }
    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>
    }

    const content = data?.jcr?.nodeById;

    return (
        <div className="media mb-4 d-md-flex d-block">
            <a href="#" className="mr-5">
                <img
                    className="img-fluid"
                    src="images/industrial_blog_1.jpg"
                    alt="Free website template by Free-Template.co"
                />
            </a>
            <div className="media-body">
                <span className="post-meta">Feb 26th, 2018</span>
                <h3 className="mt-2 text-black">
                    <a href="#">
                        How to handle any intercate custom design
                    </a>
                </h3>
                <p>
                    Separated they live in Bookmarks grove right at the coast of the Semantics, a large language ocean.
                </p>
                <p>
                    <a href="#" className="readmore">
                        Read More
                        <!-- icon -->
                    </a>
                </p>
            </div>
        </div>
    )
}

Blog.propTypes = {
    id: PropTypes.string.isRequired
};
export default Blog;
