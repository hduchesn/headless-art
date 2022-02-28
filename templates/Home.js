import Hero from '../components/Hero'
import HalfBlock from "../components/HalfBlock"
import Nav from "../components/Nav"
import Card from "../components/Card"
import RichText from "../components/text/RichText";

const Home = ({templateName,path,content}) => {

    // const getNodes = gql`query($workspace: Workspace!, $base: String!) {
    //     jcr(workspace: $workspace) {
    //         nodeByPath(path: $base) {
    //             id: uuid
    //             children {
    //                 nodes {
    //                     id: uuid
    //                     name
    //                     path
    //                     primaryNodeType {
    //                         name
    //                     }
    //                     properties {
    //                         name
    //                         value
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }`;
    //
    // const ret = useQuery(getNodes, {
    //     variables: {
    //         base: path + "/area-main",
    //         workspace
    //     }
    // })




console.log("[Home] templateName : ",templateName);
    return(
        <div jahiatype="mainmodule"
             path={path}
             locale="en"
             template=""
             templateName={templateName}
             nodetypes="nt:base jmix:navMenuItem">

            <Nav/>
            <div className="top-shadow"></div>
            {/*<Hero/>*/}
            {/*<HalfBlock/>*/}
            {/*<section className="section bg-light">*/}
            {/*    <div className="container">*/}
            {/*        <div className="row">*/}
            {/*            {content?.media?.map((item,index) => (*/}
            {/*                    <div className="col-md-6 col-lg-4 element-animate "*/}
            {/*                         key={index}*/}
            {/*                         dangerouslySetInnerHTML={{ __html: item }}>*/}
            {/*                    </div>*/}
            {/*                )*/}
            {/*            )}*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}
            {/*<section className="section">*/}
            {/*    <div className="container">*/}
            {/*        <div className="row justify-content-center mb-5 element-animate">*/}
            {/*            <div className="col-md-8 text-center">*/}

            {/*                <RichText content={`<h2 class="heading mb-4">Meet The Team</h2>*/}
            {/*                <p class="mb-5 lead">Far far away, behind the word mountains, far from the countries*/}
            {/*                    Vokalia and Consonantia, there live the blind texts. Separated they live in*/}
            {/*                    Bookmarksgrove.</p>`}/>*/}

            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className="row">*/}
            {/*            {content?.cards?.map((card,index) => (*/}
            {/*                <div key={index} className="col-lg-3">*/}
            {/*                    <Card  content={card}/>*/}
            {/*                </div>*/}
            {/*            ))}*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}

        </div>

    )
}
export default Home;


