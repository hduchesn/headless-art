import React from "react";
import * as PropTypes from "prop-types";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {types} from "../types";
import {JahiaComponent} from "../../JahiaComponent";


function BS4Row({grid,mixins,children}) {

    if(!mixins.includes(types.createRow))
        return children

    const rowProps = {}
    if(grid.rowId?.value)
        rowProps.id=grid.rowId.value;
    if(grid.rowCssClass?.value)
        rowProps.className=`${grid.rowCssClass?.value} ${grid.rowVerticalAlignment?.value} ${grid.rowHorizontalAlignment?.value}`;

    // console.log("[BS4Row] mixins : ",mixins);
    // console.log("[BS4Row] children : ",children);
    // console.log("[BS4Row] rowProps : ",rowProps);

    function predifinedGrid() {
        const cols = grid.grid?.value?.split("_");
        return (
            <Row {...rowProps}>
                {cols.map( (col,index) => {
                    const node = grid.children?.nodes[index]
                    return(
                        <Col key={node.uuid} md={col}>
                            <JahiaComponent
                                key={node.uuid}
                                node={node}
                                tagProps={{
                                    type:"area",
                                    //todo get this dynamically
                                    nodetypes:"jmix:droppableContent",
                                    referencetypes: "jnt:fileReference[jnt:file] jnt:fileI18nReference[jnt:file] jnt:contentReference[jmix:droppableContent] jnt:contentFolderReference[jnt:contentFolder] jnt:portletReference[jnt:portlet] jnt:imageReferenceLink[jmix:image] jnt:imageReference[jmix:image] jnt:nodeLinkImageReference[jmix:image] jnt:nodeLinkI18nImageReference[jmix:image] jnt:externalLinkImageReference[jmix:image] jnt:externalLinkI18nImageReference[jmix:image] jnt:imageI18nReference[jmix:image] wdennt:widenReference[wdenmix:widenAsset]",
                                    allowreferences: "true",
                                }}
                            />
                        </Col>
                    )
                })}
            </Row>
        )
    }

    function customGrid() {
        const cols = grid.gridClasses?.value?.split(",");
        return (
            <Row {...rowProps}>
                {cols.map( (col,index) => {
                    const node = grid.children?.nodes[index]
                    return(
                        <Col key={node.uuid} className={col}>
                            <JahiaComponent
                                key={node.uuid}
                                node={node}
                                tagProps={{
                                    type:"area",
                                    //todo get this dynamically
                                    nodetypes:"jmix:droppableContent",
                                    referencetypes: "jnt:fileReference[jnt:file] jnt:fileI18nReference[jnt:file] jnt:contentReference[jmix:droppableContent] jnt:contentFolderReference[jnt:contentFolder] jnt:portletReference[jnt:portlet] jnt:imageReferenceLink[jmix:image] jnt:imageReference[jmix:image] jnt:nodeLinkImageReference[jmix:image] jnt:nodeLinkI18nImageReference[jmix:image] jnt:externalLinkImageReference[jmix:image] jnt:externalLinkI18nImageReference[jmix:image] jnt:imageI18nReference[jmix:image] wdennt:widenReference[wdenmix:widenAsset]",
                                    allowreferences: "true",
                                }}
                            />
                        </Col>
                    )
                })}
            </Row>
        )
    }

    function getGrid() {
        if(mixins.includes(types.predefinedGrid))
            return predifinedGrid();
        if(mixins.includes(types.customGrid))
            return customGrid();
    }

    return getGrid();
}

BS4Row.propTypes = {
    grid : PropTypes.object.isRequired,
    mixins : PropTypes.array,
    children: PropTypes.object,
};

export default BS4Row;
