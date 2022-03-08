import Item from "./Item"

const Heading = ({items,locale,isEdit}) =>{

    return (
        <>
            {
                items.map(item =>
                    <Item key={item.uuid}
                          id={item.uuid}
                          locale={locale}
                          isEdit={isEdit}/>
                )
            }
        </>
    );
}

export default Heading;
