import Open from "./Open";
import FixedStructure from "./FixedStructure";
import {templates} from "@jahia/nextjs-sdk";

export const registerTemplates = () => {
    console.log('[registerTemplates] templates BEFORE assign : ', templates)
    Object.assign(templates, {
        'open': Open,
        'fixedstructure': FixedStructure,
        'default': Open
    });
    console.log('[registerTemplates] templates AFTER assign : ', templates)
}
