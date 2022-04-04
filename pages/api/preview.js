import {getPageInfo} from "../../lib/pages";
import jahia from '../../jahia';

export default async function handler(req, res) {
    console.log('[API Preview] req.query.path: ',req.query?.path)
    console.log('[API Preview] process.env.NEXT_PREVIEW_SECRET: ',process.env.NEXT_PREVIEW_SECRET)
    const path = req.query?.path

    // Check the secret and next parameters
    // This secret should only be known to this API route and the CMS
    if (req.query.secret !== process.env.NEXT_PREVIEW_SECRET) {
        const html=`
        <div jahiatype="mainmodule"
             path={path}
             locale="en"
             template=""
             templateName="home"
             nodetypes="nt:base jmix:navMenuItem">
            <h2>oups Invalid token, please configure your NEXT PREVIEW SECRET at site level</h2>
        </div>`;
        res.type('html');
        res.send(html);
    }


    // const qIndex = path.indexOf('?')
    // if(qIndex!==-1)
    //     path = path.substr(0,qIndex)

    const {error, data} = await getPageInfo(path,"EDIT");
    // const {error, data} = await client.query({
    //     query: getPageInfo,
    //     variables: { path: req.query.path.substring(req.query.path.indexOf('ssg/') + 3) }
    // });

    // If the slug doesn't exist prevent preview mode from being enabled
    if (error || !data.jcr.nodeByPath) {
        const html=`
        <div jahiatype="mainmodule"
             path={path}
             locale=""
             template=""
             templateName=""
             nodetypes="nt:base jmix:navMenuItem">
            <h2>oups Invalid path</h2>
        </div>`;
        res.type('html');
        res.send(html);
        // return res.status(401).json({ message: 'Invalid path' })
    }

    const isEdit = req.query.edit === "true" ? true : false;
    // Enable Preview Mode by setting the cookies
    res.setPreviewData({
        // isEdit:req.query.edit === "true" ? true : false
    },{
        // maxAge: 30, // The preview mode cookies expire in 30 s
    })

    let redirect = `${jahia.paths.preview}${data.jcr.nodeByPath.path}.html`;
    if(isEdit)
        redirect = `${jahia.paths.edit}${data.jcr.nodeByPath.path}.html?redirect=${req.query?.redirect}`;//&edit=${isEdit}
console.log("[API Preview] redirect to : ",redirect);
    // Redirect to the path from the fetched post
    // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
    //TODO
    res.redirect(redirect);
}
