import React from 'react';
import {JahiaCtx} from "@jahia/nextjs-lib";
import * as PropTypes from "prop-types";

function Main({path, templateName, children}) {
    const {isEditMode,locale} = React.useContext(JahiaCtx);

    if (!isEditMode) {
        // eslint-disable-next-line react/jsx-no-useless-fragment
        return (<>{children}</>)
    }

    return (
        <div
            jahiatype="mainmodule"
            path={path}
            locale={locale}
            template=""
            templatename={templateName}
            nodetypes="nt:base jmix:navMenuItem"
        >
            {children}
        </div>
    )
}

Main.propTypes = {
    path : PropTypes.string.isRequired,
    templateName: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};

export default Main;
