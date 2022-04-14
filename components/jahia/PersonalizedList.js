import React, {useContext} from 'react';
import {JahiaCtx} from "../../lib/context";
import * as PropTypes from "prop-types";
import {PersonalizedContentEdit} from "./PersonalizedContentEdit";
import {PersonalizedContentLive} from "./PersonalizedContentLive";

export function PersonalizedList(props) {
    const {isEditMode} = useContext(JahiaCtx);

    return isEditMode ? (
        <div>personalized list</div>
    ) : (
        <div>personalized list</div>
    )
}

PersonalizedList.propTypes = {
    // id: PropTypes.string.isRequired,
}

