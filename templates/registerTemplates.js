import Open from "./Open";
import FixedStructure from "./FixedStructure";
import CardContentTemplate from "./Card/ContentTemplate";
import GenericContentTemplate from "./GenericContent/ContentTemplate";
import {templates} from "@jahia/nextjs-sdk";

export const registerTemplates = () => {
    Object.assign(templates, {
        'default': Open,
        'open': Open,
        'fixedstructure': FixedStructure,
        'hicnt:card': CardContentTemplate,
        'hicnt:genericContent': GenericContentTemplate

    });
}
