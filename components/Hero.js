import React from "react";
import {useContext} from "react";
import {JahiaCtx} from "../lib/context";
import {gql, useQuery} from "@apollo/client";

const Hero = ({id, path, locale}) => {
    const {workspace} = useContext(JahiaCtx);
    const [content,setContent] = React.useState({})
    const getContent = gql`query($workspace: Workspace!, $id: String!,$language:String!){
        jcr(workspace: $workspace) {
            nodeById(uuid: $id) {
                id:uuid
                name
                body: property(language:$language, name:"body"){
                    value
                }
                media: property(language:$language,name:"wden:mediaNode",){
                    node: refNode {
                        id: uuid
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

    const getImageURI = (uri) => {
        if(!uri)
            return
        const index = uri.lastIndexOf("/")
        const filename = encodeURIComponent(uri.substring(index+1));
        return `${uri.substring(0,index)}/${filename}`;
    }
//element-animate
//     <div className="slider-item" style={{backgroundImage: `url('/files/default${getImageURI(content.media?.path)}')`}}>
//     <div className="slider-item" style={{backgroundImage:   `url('/files/default${encodeURI(content.media?.path)}')`}}>
    return(
        <div className="inner-page">
            <div className="slider-item" style={{backgroundImage: `url('/files/default${getImageURI(content.media?.path)}')`}}>
                <div className="container">
                    <div className="row slider-text align-items-center justify-content-center">
                        <div className="col-md-8 text-center col-sm-12  pt-5"
                             dangerouslySetInnerHTML={{ __html: content.body }}>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    // return(
    //     <div className="inner-page">
    //         <div className="slider-item" style={{backgroundImage: "url('/static/img/industrial_hero_3.jpg')"}}>
    //             <div className="container">
    //                 <div className="row slider-text align-items-center justify-content-center">
    //                     <div className="col-md-8 text-center col-sm-12 element-animate pt-5">
    //                         <h1 className="pt-5"><span>About Us</span></h1>
    //                         <p className="mb-5 w-75">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero sit,
    //                             saepe? Rem, libero repellendus eum.</p>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // )
}
export default Hero;
