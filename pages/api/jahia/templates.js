import {getTemplates} from '@jahia/nextjs-sdk';
// import {registerTemplates} from '../../../templates/registerTemplates';
const excludedName = [
    'default',
    'hicnt:card',
    'hicnt:genericContent'
];

export default (req,res) => getTemplates(req, res,excludedName)
