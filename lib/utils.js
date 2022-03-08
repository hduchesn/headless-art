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
        return
    const index = uri.lastIndexOf("/")
    const filename = encodeURIComponent(uri.substring(index+1));
    return `${filePath}${uri.substring(0,index)}/${filename}`;
}

export const getBoolean = (test) => {
    try{
        JSON.parse(test)
        return true;
    }catch(error){
        console.warn(`[getBoolean] value : [ ${test} ] is not a boolean`)
    }
    return false;
}
