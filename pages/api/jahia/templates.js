import path from "path";
import fs from "fs";

const postsDirectory = path.join(process.cwd(), 'templates')
const excludedName = ["index"]

export default function handler(req, res) {
    // Get file names under /templates
    const fileNames = fs.readdirSync(postsDirectory)
    const allTemplateNames = fileNames.map(fileName => {
        const name = fileName.substr(0,fileName.lastIndexOf(".")).toLowerCase();
        return {
            name,
            displayName : name.charAt(0).toUpperCase() + name.slice(1)
        }
    }).filter(template => !excludedName.includes(template.name));

    res.status(200).json(allTemplateNames)
}
