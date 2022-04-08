import Home from "./Home";
import About from "./About";
import Third from "./Third";
import * as PropTypes from "prop-types";

const templates = {
    'about': About,
    'home': Home,
    'third':Third,
    'default': Home,
}

function Template({templateName, ...props}) {
    console.log('Render page ', props.path, ", with template : ",templateName)

    if (templateName && templates[templateName]) {
        const Template = templates[templateName];
        return (
            // eslint-disable-next-line react/react-in-jsx-scope
            <Template templateName={templateName} {...props}/>
        );
    }
    console.log('Template not found: ', templateName)
    // eslint-disable-next-line react/react-in-jsx-scope
    return <span>Template not found : {templateName}</span>
}


Template.propTypes = {
    path: PropTypes.string.isRequired,
    templateName: PropTypes.string.isRequired
};

export default Template
