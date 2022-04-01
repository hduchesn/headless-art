import React from "react";
import {JahiaCtx} from "../../lib/context";
// import styles from "components/images/halfBlock.module.css";
import {getImageURI} from "../../lib/utils";

const BasicImage = ({imageNode}) =>{
    const {workspace} = React.useContext(JahiaCtx);

    return <img src={getImageURI({uri:imageNode.media?.refNode?.path,workspace})}
                alt="Free template by Free-Template.co" className="img-fluid"/>
}

export default BasicImage;
