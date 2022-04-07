import React from 'react';
import Item from "./Item";
import {JahiaCtx} from "../../../lib/context";
import * as PropTypes from "prop-types";

function Heading({items, divs}) {
    const {isEditMode} = React.useContext(JahiaCtx);

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

Heading.propTypes = {
    items : PropTypes.array.isRequired,
    divs: PropTypes.object
};

export default Heading;
