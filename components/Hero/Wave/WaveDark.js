import React from 'react';
import {Wave} from "./Wave";
import * as PropTypes from "prop-types";

export function WaveDark(props) {
    return (
        <Wave wave="dark" {...props}/>
    );
}
WaveDark.propTypes = {
    id: PropTypes.string.isRequired,
};
