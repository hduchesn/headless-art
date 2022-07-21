import Open from "./Open";
import FixedStructure from "./FixedStructure";
import CardContentTemplate from "./Card/ContentTemplate";
import {templates} from "@jahia/nextjs-sdk";

export const registerTemplates = () => {
    Object.assign(templates, {
        'open': Open,
        'fixedstructure': FixedStructure,
        'hicnt:card': CardContentTemplate,
        'default': Open
    });
}
