import React from 'react';
import Item from "./Item";
import {JahiaCtx} from "@jahia/nextjs-lib";
import * as PropTypes from "prop-types";
import {ChevronLeft,ChevronRight} from "react-bootstrap-icons";
import JahiaModuleTag from "../../jahia/JahiaModuleTag";
function Heading({items,carouselId}) {
    const {isEditMode} = React.useContext(JahiaCtx);

    const getItems = () => {
        if(isEditMode){
            return (
                items.map(item => (
                    <JahiaModuleTag key={item.uuid} path={item.path} nodetypes={item.primaryNodeType.name}>
                        <Item
                            key={item.uuid}
                            id={item.uuid}/>
                    </JahiaModuleTag>
                    // </div>
                ))
            )
        }else{
            return (
                <>
                    {items.map(item => (
                        <Item
                                key={item.uuid}
                                id={item.uuid}/>
                    ))}
                    <div>
                        <div id={`owl-prev-${carouselId}`}>
                            <ChevronLeft/>
                        </div>
                        <div id={`owl-next-${carouselId}`}>
                            <ChevronRight/>
                        </div>
                    </div>
                </>
            )
        }
    }

    return getItems();
}

Heading.propTypes = {
    items : PropTypes.array.isRequired,
    carouselId:PropTypes.string
};

export default Heading;
