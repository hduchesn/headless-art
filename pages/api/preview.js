import {getPageInfo} from "../../lib/pages";
import jahia from '../../jahia';

const getHTMLError = ({message,path,locale}) => `
    <div jahiatype="mainmodule"
         path=${path}
         locale=${locale}
         template=""
         templateName="home"
         nodetypes="nt:base jmix:navMenuItem">
        <h2>${message}</h2>
    </div>`


export default async function handler(req, res) {
    const defaultLocale="en"
    let jahiaContext;
    try{
        if(req.cookies?.__jContent_preview_ctx)
            jahiaContext = JSON.parse(req.cookies.__jContent_preview_ctx);
    }catch (e){
        console.error("[API Preview] jahiaContext json parse error : ",e );
    }

    const locale = jahiaContext.locale || defaultLocale;

    // console.log('[API Preview] req: ',req)
    console.log('[API Preview] req.cookies.__jContent_preview_ctx: ',req.cookies?.__jContent_preview_ctx)

    // console.log('[API Preview] req.query.path: ',req.query?.path)
    // console.log('[API Preview] process.env.NEXT_PREVIEW_SECRET: ',process.env.NEXT_PREVIEW_SECRET)

    const path = req.query?.path

    // Check the secret and next parameters
    // This secret should only be known to this API route and the CMS
    if (req.query.secret !== process.env.NEXT_PREVIEW_SECRET) {
        res.setHeader('content-type', 'text/html');
        return res.send(getHTMLError({
            path,
            locale,
            message:"Oups! Invalid token, please configure the NEXT PREVIEW SECRET at site level"
        }));
    }

    const {error, data} = await getPageInfo(path,"EDIT");

    // If the slug doesn't exist prevent preview mode from being enabled
    if (error || !data.jcr.nodeByPath) {
        res.setHeader('content-type', 'text/html');
        return res.send(getHTMLError({
            path,
            locale,
            message:"Oups! Invalid path"
        }));
    }


    // Enable Preview Mode by setting the cookies
    res.setPreviewData({
        // isEdit:req.query.edit === "true" ? true : false
    },{
        // maxAge: 30, // The preview mode cookies expire in 30 s
    })

    let redirect = `${jahia.paths.preview}/${locale}${data.jcr.nodeByPath.path}.html`;
    if(jahiaContext.edit)
        redirect = `${jahia.paths.edit}/${locale}${data.jcr.nodeByPath.path}.html?redirect=${req.query?.redirect}`;
console.log("[API Preview] redirect to : ",redirect);
    // Redirect to the path from the fetched post
    // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
    res.redirect(redirect);
}
