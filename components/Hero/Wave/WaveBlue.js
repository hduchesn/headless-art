import React from 'react';
import * as PropTypes from "prop-types";
import {Wave} from "./Wave";

export function WaveBlue({id}) {
    return (
        <Wave wave="blue" id={id}/>
    );
}
WaveBlue.propTypes = {
    id: PropTypes.string.isRequired,
};
