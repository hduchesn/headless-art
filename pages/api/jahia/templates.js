import {getTemplates} from '@jahia/nextjs-sdk';
// Import {registerTemplates} from '../../../templates/registerTemplates';
const excludedName = [
    'default',
];

export default (req, res) => getTemplates(req, res, excludedName);
