import { useRouter } from 'next/router'


import Template from "templates";
import {getAllPages} from "lib/pages";



const DynamicPage = (props) => {

    return <Template templateName/>;
    // const {query,pathname} = useRouter();
    // const {jpath} = query;
    // console.log("router.query : ",query);
    // console.log("jpath : ",jpath);
    // console.log("router.pathname : ",pathname);
    //
    // // <Home content={content}/>
    //
    // return(
    //     <h1>Hello me</h1>
    //
    // )
}

export default DynamicPage;

export const getStaticPaths = async (context) => {
    console.log('Get static path')

    return {
        paths: getAllPages(),
        fallback: 'blocking'
    }

}

export const getStaticProps = async (context) => {
    // const { params, locale, locales, defaultLocale, preview = null } = context
    //TODO or not getPageInfo()
    console.log("Get static props", context.preview)
    // Nothing to add
    return {
        props: {
            isPreview: !context.preview
        },
        revalidate: 10
    }
}

// export async function getStaticProps() {
//
//     const content = {
//         media:[
//             `<div class="media block-6 d-block text-center">
//               <div class="icon mb-3"><span class="ion-android-notifications text-primary"></span></div>
//               <div class="media-body">
//                 <h3 class="heading">Modern Design</h3>
//                 <p>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.</p>
//               </div>
//             </div>`,
//             `<div class="media block-6 d-block text-center">
//               <div class="icon mb-3"><span class="ion-heart text-primary"></span></div>
//               <div class="media-body">
//                 <h3 class="heading">Built With Passion</h3>
//                 <p>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.</p>
//               </div>
//             </div>`,
//             `<div class="media block-6 d-block text-center">
//               <div class="icon mb-3"><span class="ion-flash text-primary"></span></div>
//               <div class="media-body">
//                 <h3 class="heading">Fast Loading</h3>
//                 <p>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.</p>
//               </div>
//             </div>`
//         ],
//         cards:[
//             {
//                 linkTo:"http://www.jahia.com",
//                 image:"/static/img/person_1.jpg",
//                 body:`<div class="media-body">
//                         <h3 class="mt-0 text-black">Mellisa Howard</h3>
//                     </div>`
//             },
//             {
//                 linkTo:"http://www.jahia.com",
//                 image:"/static/img/person_2.jpg",
//                 body:`<div class="media-body">
//                         <h3 class="mt-0 text-black">Mike Richardson</h3>
//                     </div>`
//             },
//             {
//                 linkTo:"http://www.jahia.com",
//                 image:"/static/img/person_4.jpg",
//                 body:`<div class="media-body">
//                         <h3 class="mt-0 text-black">Laura Smith</h3>
//                     </div>`
//             },
//             {
//                 linkTo:"http://www.jahia.com",
//                 image:"/static/img/person_3.jpg",
//                 body:`<div class="media-body">
//                         <h3 class="mt-0 text-black">Kevin Gold</h3>
//                     </div>`
//             }
//         ]
//     }
//
//     return {
//         props: {
//             content
//         }
//     }
// }
