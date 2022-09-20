import {getViews} from '@jahia/nextjs-sdk';
import {registerComponents} from '../../../components/registerComponents';
export default (req, res) => {
    registerComponents();
    return getViews(req, res);
};
