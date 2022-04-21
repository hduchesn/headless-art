import React from "react";
import {JahiaPage} from "@jahia/nextjs-lib";

export default JahiaPage.Component;
export const getStaticPaths = JahiaPage.getStaticPaths;
export const getStaticProps = JahiaPage.getStaticProps;
