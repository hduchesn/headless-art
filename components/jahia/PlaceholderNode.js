const generateUUID = () => {
    let d = new Date().getTime();
    // if (window.performance && typeof window.performance.now === "function") {
    //     d += performance.now();  //use high-precision timer if available
    // }
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

function PlaceholderNode({path, nodetypes, children}) {
// console.log("[PlaceholderNode] children : ",children);
    const divElt = {
        class: 'jahia-template-gxt',
        jahiatype: 'module',
        id: `module${generateUUID()}`,
        type: 'existingNode',
        // scriptinfo:"Path dispatch: /modules/industrial/2.1.2/tint_text/html/text.jsp",
        path,
        showareabutton: 'true',
        allowreferences: "false",
        nodetypes
    }


    return (
        <div {...divElt}>
            {children}
        </div>
    )
}

export default PlaceholderNode
