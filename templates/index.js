import Home from "./Home";
// import News from "./News";
// import TwoColumns from "./TwoColumns";

export const templates = {
    'home': Home,
    // 'news': News,
    'default': Home,
    // '2-column': TwoColumns
}

export function getPage({templateName, ...props}) {
    console.log('Render page ', props.path)
    if (templateName && templates[templateName]) {
        const Template = templates[templateName];
        return (
            <Template templateName={templateName} {...props}/>
        );
    }
    console.log('Template not found: ', templateName)
    return <span>Template not found : {templateName}</span>
}

