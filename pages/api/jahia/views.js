import {componentsByType} from '@jahia/nextjs-sdk';
import {registerComponents} from '../../../components/registerComponents';
const excludedName = ['default'];

export default function handler(req, res) {
    if (req.query.secret !== process.env.NEXT_PREVIEW_SECRET) {
        return res.status(401).json({message: 'Invalid token'});
    }

    const queryContentType = req.query.nodetype;
    if (!queryContentType) {
        console.warn("nodetype parameter is missing (no view selected) return default")
        return res.status(200).json({
            name: "default",
            displayName: "Default",
        })
        // return res.status(400).json({message: 'nodetype is missing'});
    }

    // console.log("queryContentType :",queryContentType);
    let viewNames = [];
    try {
        registerComponents();
        viewNames = Object
            .keys(componentsByType)
            .filter(contentType => contentType === queryContentType)
            .map(contentType => {
                // console.log("contentType :",contentType);
                const views = componentsByType[contentType]
                // console.log("views :",views);
                // console.log("typeof views :",typeof views)
                if(typeof views === "function")
                    return {
                        name: "default",
                        displayName: "Default",
                    }
                return Object
                    .keys(views)
                    .map(viewName => ({
                        name: viewName,
                        displayName: viewName.charAt(0).toUpperCase() + viewName.slice(1),
                    }))
            })
            .flat();
    } catch (e) {
        console.warn('[API views] error reading template names; error: ', e);
    }

    return res.status(200).json(viewNames);
}
