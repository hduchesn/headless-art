import {JahiaCtx} from "lib/context";
import {gql, useQuery} from "@apollo/client";

const HalfBlock = () => {
    const {workspace} = useContext(JahiaCtx);
    const [content,setContent] = React.useState({})
    const getContent = gql`query($workspace: Workspace!, $id: String!,$language:String!){
        jcr(workspace: $workspace) {
            workspace
            nodeById(uuid: $id) {
                workspace
                uuid
                name
                body: property(language:$language, name:"body"){
                    value
                }
                media: property(language:$language,name:"wden:mediaNode",){
                    node: refNode {
                        workspace
                        uuid
                        type: primaryNodeType{
                            value:name
                        }
                        mixins: mixinTypes{
                            value:name
                        }
                        path
                    }
                }
            }
        }
    }`;

    useQuery(getContent, {
        variables: {
            workspace,
            id,
            language: locale,
        },
        onCompleted: data => setContent({
            body:data.jcr?.nodeById?.body.value,
            media:data.jcr?.nodeById?.media.node
        })
    });

    return (
        <section>
            <div className="half d-lg-flex d-block">
                <div className="image element-animate" data-animate-effect="fadeIn"
                     style={{backgroundImage: "url('/static/img/industrial_hero_1.jpg')"}}></div>
                <div className="text text-center element-animate">
                    <h3 className="mb-4">Our Mission</h3>
                    <p className="mb-5">Far far away, behind the word mountains, far from the countries Vokalia and
                        Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the
                        coast of the Semantics, a large language ocean.</p>
                    <p><a href="#" className="btn btn-primary btn-sm px-3 py-2">Learn More</a></p>
                </div>
            </div>

            <div className="half d-lg-flex d-block">
                <div className="image order-2 element-animate" data-animate-effect="fadeIn"
                     style={{backgroundImage: "url('/static/img/industrial_hero_2.jpg')"}}></div>
                <div className="text text-center element-animate">
                    <h3 className="mb-4">Company History</h3>
                    <p className="mb-5">Far far away, behind the word mountains, far from the countries Vokalia and
                        Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the
                        coast of the Semantics, a large language ocean.</p>

                    <p><a href="#" className="btn btn-primary btn-sm px-3 py-2">Learn More</a></p>
                </div>
            </div>
        </section>
    )
    // return (
    //     <section>
    //         <div className="half d-lg-flex d-block">
    //             <div className="image element-animate" data-animate-effect="fadeIn"
    //                  style={{backgroundImage: "url('/static/img/industrial_hero_1.jpg')"}}></div>
    //             <div className="text text-center element-animate">
    //                 <h3 className="mb-4">Our Mission</h3>
    //                 <p className="mb-5">Far far away, behind the word mountains, far from the countries Vokalia and
    //                     Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the
    //                     coast of the Semantics, a large language ocean.</p>
    //                 <p><a href="#" className="btn btn-primary btn-sm px-3 py-2">Learn More</a></p>
    //             </div>
    //         </div>
    //
    //         <div className="half d-lg-flex d-block">
    //             <div className="image order-2 element-animate" data-animate-effect="fadeIn"
    //                  style={{backgroundImage: "url('/static/img/industrial_hero_2.jpg')"}}></div>
    //             <div className="text text-center element-animate">
    //                 <h3 className="mb-4">Company History</h3>
    //                 <p className="mb-5">Far far away, behind the word mountains, far from the countries Vokalia and
    //                     Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the
    //                     coast of the Semantics, a large language ocean.</p>
    //
    //                 <p><a href="#" className="btn btn-primary btn-sm px-3 py-2">Learn More</a></p>
    //             </div>
    //         </div>
    //     </section>
    // )
}

export default HalfBlock;
