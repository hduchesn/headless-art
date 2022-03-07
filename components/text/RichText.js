const RichText = ({id,path}) => {
    const content= "<h3>Hello le text</h3>"
    return (
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
    )
}
export default RichText
