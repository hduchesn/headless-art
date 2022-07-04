/* eslint-disable prefer-destructuring */
import {JahiaPage} from '@jahia/nextjs-sdk';

export default JahiaPage.Component;
export const getStaticPaths = JahiaPage.getStaticPaths;
export const getStaticProps = JahiaPage.getStaticProps;
