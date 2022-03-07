import React from "react";
// import {StoreContext} from "contexts";
import Image from "next/image";

const Img = ({path,alt}) =>{
    // const { state} = React.useContext(StoreContext);
    // const {files_endpoint} = state.jContent;
    // return(
    //     <img className="d-block w-100"
    //          src={`${files_endpoint}${encodeURI(path)}`}
    //          alt={alt}/>
    // )
    return <Image src={encodeURI(path)}
                  layout="fill"
                  alt={alt}/>
}
export default Img;
