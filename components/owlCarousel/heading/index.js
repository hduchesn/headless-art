import React from 'react';
import Item from "./Item";
import {JahiaCtx} from "../../../lib/context";

function Heading({items, divs}) {
    const {isEditMode} = React.useContext(JahiaCtx);
    console.log("[Heading] isEditMode : ", isEditMode);


    return (
        <>
            {isEditMode &&
                items.map(item => (
                    <div key={item.uuid} {...divs[item.path]}>
                        <Item
                                key={item.uuid}
                                id={item.uuid}/>
                    </div>
                )
                )}
            {!isEditMode &&
                items.map(item => (
                    <Item
                            key={item.uuid}
                            id={item.uuid}/>
                )
                )}
        </>
    );
}

export default Heading;
