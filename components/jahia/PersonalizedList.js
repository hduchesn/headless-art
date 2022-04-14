import React, {useContext} from 'react';
import {JahiaCtx} from "../../lib/context";
import * as PropTypes from "prop-types";
import {PersonalizedContentEdit} from "./PersonalizedContentEdit";
import {PersonalizedContentLive} from "./PersonalizedContentLive";
import {ContentList} from "./ContentList";

export function PersonalizedList({id}) {
    const {isEditMode} = useContext(JahiaCtx);

    return isEditMode ? (
        <>
            <div>Personalized list</div>
            <ContentList id={id}/>
        </>
    ) : (
        <div>No render for personalized list yet ...</div>
    )
}

PersonalizedList.propTypes = {
    // id: PropTypes.string.isRequired,
}

