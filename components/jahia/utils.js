import {parse} from "node-html-parser";

export const getJahiaDivsProps = (output) => {
    // console.log("[getJahiaDivsProps] output : ",output);
    if (!output) {
        return [];
    }

    const html = parse(output);
    return html?.getElementsByTagName('div')
        .reduce((map, div) => {
            const path = div.getAttribute('path');
            if (path) {
                map[path] = div.attributes;
            }
            return map;
        }, {})
}

export const getImageURI = ({uri, workspace}) => {
    const filePath = `/files/${workspace === 'EDIT' ? 'default' : 'live'}`
    if (!uri) {
        return ""
    }
    const index = uri.lastIndexOf("/")
    const filename = encodeURIComponent(uri.substring(index + 1));
    return `${filePath}${uri.substring(0, index)}/${filename}`;
}

export const getPathAndQuery = (asPath) => {
    const [path, queryParams] = asPath.split("?");
    const query = queryParams?.split('&').reduce((queryObj, item) => {
        const [key, value] = item.split('=');
        queryObj[key] = value;
        return queryObj;
    }, {});
    return [path, query];
}

// export const generateUUID = () => {
//     let d = new Date().getTime();
//     // if (window.performance && typeof window.performance.now === "function") {
//     //     d += performance.now();  //use high-precision timer if available
//     // }
//     const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
//         const r = (d + Math.random() * 16) % 16 | 0;
//         d = Math.floor(d / 16);
//         return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
//     });
//     return uuid;
// }


export function generateUUID() { // Public Domain/MIT
    let d = new Date().getTime();//Timestamp
    let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16;//random number between 0 and 16
        if (d > 0) {//Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
