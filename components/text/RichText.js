const RichText = ({content}) => {
    return (
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
    )
}
export default RichText
