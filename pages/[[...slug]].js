/* eslint-disable prefer-destructuring */
import {JahiaPage} from '@jahia/nextjs-sdk';

export default JahiaPage.Component;
export const getStaticPaths = JahiaPage.getStaticPaths;
export const getStaticProps = JahiaPage.getStaticProps;

// Export const getStaticProps = async context => {
//     const data = await JahiaPage.getStaticProps(context);
//     return {
//         ...data,
//         revalidate: parseInt(process.env.NEXT_ISR_TIME, 10),
//     };
// };

