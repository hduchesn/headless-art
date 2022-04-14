import path from "path";
import fs from "fs";
// export const config = {
//     'unstable_includeFiles': ['templates'],
// };

const templatesDirectory = path.join(process.cwd(), 'templates')
const excludedName = ["index"]

export default function handler(req, res) {
    console.log("[api/jahia/templates] req.url : ",req.url);
    console.log("[api/jahia/templates] req.query : ",req.query);
    if (req.query.secret !== process.env.NEXT_PREVIEW_SECRET){
        return res.status(401).json({ message: 'Invalid token' })
    }

    // Get file names under /templates
    const fileNames = fs.readdirSync(templatesDirectory)
    const allTemplateNames = fileNames.map(fileName => {
        const name = fileName.substr(0, fileName.lastIndexOf(".")).toLowerCase();
        return {
            name,
            displayName: name.charAt(0).toUpperCase() + name.slice(1)
        }
    }).filter(template => !excludedName.includes(template.name));

    return res.status(200).json(allTemplateNames)
}
