
const Main = ({path,templateName,locale,isEdit,children}) =>{
    const isEditMode = JSON.parse(isEdit) || false;

    if(!isEditMode)
        return(<>{children}</>)

    return(
        <div jahiatype="mainmodule"
             path={path}
             locale={locale}
             template=""
             templateName={templateName}
             nodetypes="nt:base jmix:navMenuItem">
            {children}
        </div>
    )
}
export default Main;
