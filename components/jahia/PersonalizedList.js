import React, {useContext} from 'react';
import {JahiaCtx} from "../../lib/context";
import * as PropTypes from "prop-types";
import {PersonalizedContentEdit} from "./PersonalizedContentEdit";
import {PersonalizedContentLive} from "./PersonalizedContentLive";
import {ContentList} from "./ContentList";
import {PersonalizedContent} from "./PersonalizedContent";

export function PersonalizedList(props) {
    const {isEditMode} = useContext(JahiaCtx);

    return isEditMode ? (
        <>
            <div>Personalized list</div>
            <ContentList {...props}/>
        </>
    ) : (
        <PersonalizedContentLive firstOnly={false} {...props}/>
    )
}

PersonalizedList.propTypes = {
    id: PropTypes.string.isRequired,
}

