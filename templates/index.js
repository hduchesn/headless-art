import Home from "./Home";
import About from "./About";
// import TwoColumns from "./TwoColumns";

const templates = {
    'about': About,
    'home': Home,
    'default': Home,
}

const Template = ({templateName, ...props}) => {
    console.log('Render page ', props.path, ", with template : ",templateName)
    if (templateName && templates[templateName]) {
        const Template = templates[templateName];
        return (
            <Template templateName={templateName} {...props}/>
        );
    }
    console.log('Template not found: ', templateName)
    return <span>Template not found : {templateName}</span>
}

export default Template
