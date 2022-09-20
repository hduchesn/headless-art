import {getTemplates} from '@jahia/nextjs-sdk';
import {registerComponents} from '../../../components/registerComponents';
const excludedName = [
    'default',
];

export default (req, res) => {
    registerComponents();
    return getTemplates(req, res, excludedName);
};
