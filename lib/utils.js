import {parse} from "node-html-parser";

export const getJahiaDivsProps = (output) =>{
    if(!output)
        return [];

    const html = parse(output);
    return html?.getElementsByTagName('div')
        .reduce((map,div) => {
            const path = div.getAttribute('path');
            if(path)
                map[path]=div.attributes;
            return map;
        },{})
}

export const getImageURI = ({uri,workspace}) => {
    const filePath = `/files/${workspace==='EDIT'?'default':'live'}`
    if(!uri)
        return ""
    const index = uri.lastIndexOf("/")
    const filename = encodeURIComponent(uri.substring(index+1));
    return `${filePath}${uri.substring(0,index)}/${filename}`;
}

export const getPathAndQuery = (asPath) => {
console.log("[getPathAndQuery] asPath :",asPath);
    const [path,queryParams] = asPath.split("?");
console.log("[getPathAndQuery] path :",path," || queryParams : ",queryParams);
    const query = queryParams?.split('&').reduce((queryObj,item)=>{
console.log("[getPathAndQuery] queryObj :",queryObj," || item : ",item);
        const [key,value]=item.split('=');
        queryObj[key]=value;
        return queryObj;
    },{});
console.log("[getPathAndQuery] query :",query);
    return [path,query];
}
