import {templates} from '@jahia/nextjs-sdk';
import {registerTemplates} from '../../../templates/registerTemplates';
const excludedName = [
    'default',
    'hicnt:card',
];

export default function handler(req, res) {
    if (req.query.secret !== process.env.NEXT_PREVIEW_SECRET) {
        return res.status(401).json({message: 'Invalid token'});
    }

    let templateNames = [];
    try {
        registerTemplates();
        templateNames = Object
            .keys(templates)
            .filter(templateName => !excludedName.includes(templateName))
            .map(templateName => ({
                name: templateName,
                displayName: templateName.charAt(0).toUpperCase() + templateName.slice(1),
            }));
    } catch (e) {
        console.warn('[API Templates] error reading template names; error: ', e);
    }

    return res.status(200).json(templateNames);
}
