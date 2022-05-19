import Open from "./Open";
import SearchStructure from "./SearchStructure";
import FixedStructure from "./FixedStructure";
import {templates} from "@jahia/nextjs-lib";

export const registerTemplates = () => {
    Object.assign(templates, {
        'open': Open,
        'fixedstructure': FixedStructure,
        'searchstructure': SearchStructure,
        'default': Open
    });
}
