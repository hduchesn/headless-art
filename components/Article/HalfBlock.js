import React from 'react';
import styles from './index.module.css'
import classNames from "classnames";
import {JahiaCtx} from "../../lib/context";

const HalfBlock = ({body,image,imagePosition}) => {
    const {isEditMode} = React.useContext(JahiaCtx);
    return (
        <section>
            <div className="half d-lg-flex d-block">
                <div className={classNames("image",{
                    "order-2": imagePosition?.value==="right",
                    [styles.editImageWrapper]:isEditMode
                })}>
                    {image()}
                </div>

                <div className="text text-center">
                    {body()}
                </div>
            </div>
        </section>
    )
}

export default HalfBlock;
