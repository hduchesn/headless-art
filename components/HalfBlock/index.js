import React from 'react';
import {JahiaCtx} from "../../lib/context";
import {gql, useQuery} from "@apollo/client";
import PlaceholderBtn from "../jahia/PlaceholderBtn";
import config from "../../jahia";

const HalfBlock = ({id,locale}) => {
    const {workspace} = React.useContext(JahiaCtx);
    const [content,setContent] = React.useState({})
    const getContent = gql`query($workspace: Workspace!, $id: String!){
        jcr(workspace: $workspace) {
            workspace
            nodeById(uuid: $id) {
                workspace
                uuid
                name
                imagePosition:property(name:"imagePosition"){
                    value
                }
                children{
                    items:nodes{
                        workspace
                        uuid
                        path
                        primaryNodeType{name}
                    }
                }
            }
        }
    }`;

    useQuery(getContent, {
        variables: {
            workspace,
            id
        },
        onCompleted: data => setContent(data.jcr?.nodeById)
    });

    return (
        <section>
            <div className="half d-lg-flex d-block">
                <PlaceholderBtn path="image" nodetypes={config.cnd_type.HALFBLOCK_IMAGE}/>
                <div className="text text-center">
                    <PlaceholderBtn path="body" nodetypes={config.cnd_type.INDUS_TEXT}/>
                </div>
            </div>

            {/*<div className="half d-lg-flex d-block">*/}
            {/*    <div className="image order-2 element-animate" data-animate-effect="fadeIn"*/}
            {/*         style={{backgroundImage: "url('/static/img/industrial_hero_2.jpg')"}}></div>*/}
            {/*    <div className="text text-center element-animate">*/}
            {/*        <h3 className="mb-4">Company History</h3>*/}
            {/*        <p className="mb-5">Far far away, behind the word mountains, far from the countries Vokalia and*/}
            {/*            Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the*/}
            {/*            coast of the Semantics, a large language ocean.</p>*/}

            {/*        <p><a href="#" className="btn btn-primary btn-sm px-3 py-2">Learn More</a></p>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </section>
    )
}

export default HalfBlock;
