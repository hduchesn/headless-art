import path from "path";
import fs from "fs";


const templatesDirectory = path.join(process.cwd(), 'templates')
const excludedName = ["index"]
let allTemplateNames = [
    {
        name:"fixedstructure",
        displayName:"Fixed Structure"
    },
    {
        name:"open",
        displayName:"Open"
    }
]

export default function handler(req, res) {
    console.log("[api/jahia/templates] req.url : ",req.url);
    console.log("[api/jahia/templates] req.query : ",req.query);
    if (req.query.secret !== process.env.NEXT_PREVIEW_SECRET){
        return res.status(401).json({ message: 'Invalid token' })
    }

    try{
        // Get file names under /templates !!! directory not available in prod
        const fileNames = fs.readdirSync(templatesDirectory)
        allTemplateNames = fileNames.map(fileName => {
            const name = fileName.substr(0, fileName.lastIndexOf(".")).toLowerCase();
            return {
                name,
                displayName: name.charAt(0).toUpperCase() + name.slice(1)
            }
        }).filter(template => !excludedName.includes(template.name));
    }catch(e){
        console.warn("[API Templates] error reading files, default templates returned; error: ",e)
    }


    return res.status(200).json(allTemplateNames)
}
