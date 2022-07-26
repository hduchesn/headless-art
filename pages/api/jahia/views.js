import {componentsByType, componentByMixin} from '@jahia/nextjs-sdk';
import {registerComponents} from '../../../components/registerComponents';

export default function handler(req, res) {
    if (req.query.secret !== process.env.NEXT_PREVIEW_SECRET) {
        return res.status(401).json({message: 'Invalid token'});
    }

    //     Console.log("req.query.nodetypes :",req.query.nodetypes)
    let queryNodeTypes;
    try {
        queryNodeTypes = JSON.parse(req.query.nodetypes);
    } catch (error) {
        console.warn('nodetype parameter is missing (no view selected) return default');
        return res.status(200).json([]);
    }

    // Console.log("queryNodeTypes : ",queryNodeTypes);
    const refinedComponentNames = (keyNodetype, componentList) => {
        // Console.log("[views refinedComponentNames] keyNodetype : ",keyNodetype);
        // console.log("[views refinedComponentNames] componentList : ",componentList);
        const views = componentList[keyNodetype];
        // Console.log("[views refinedComponentNames] views : ",views);
        if (!views) {
            return [];
        }

        if (typeof views === 'function') {
            return [{
                name: 'default',
                displayName: 'Default',
            }];
        }

        return Object
            .keys(views)
            .map(viewName => ({
                name: viewName,
                displayName: viewName.charAt(0).toUpperCase() + viewName.slice(1),
            }));
    };

    let viewNames = [];
    try {
        registerComponents();
        if (Array.isArray(queryNodeTypes.mixinTypes) && queryNodeTypes.mixinTypes.length > 0) {
            const mixin = queryNodeTypes.mixinTypes.find(m => componentByMixin[m]);
            if (mixin) {
                viewNames = refinedComponentNames(mixin, componentByMixin);
            }
        }

        viewNames = [...viewNames, ...refinedComponentNames(queryNodeTypes.nodeType, componentsByType)];
    } catch (e) {
        console.warn('[API views] error reading template names; error: ', e);
    }

    return res.status(200).json(viewNames);
}
