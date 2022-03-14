import React from 'react';
import {JahiaCtx} from "../../lib/context";

const Main = ({path,templateName,locale,children}) =>{
    const {isEditMode} = React.useContext(JahiaCtx);

    if(!isEditMode)
        return(<>{children}</>)

    return(
        <div jahiatype="mainmodule"
             path={path}
             locale={locale}
             template=""
             templateName={templateName}
             nodetypes="nt:base jmix:navMenuItem">
            {children}
        </div>
    )
}
export default Main;
