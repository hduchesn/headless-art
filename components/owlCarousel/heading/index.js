import Item from "./Item"
import {getBoolean} from "../../../lib/utils";

const Heading = ({items,locale,divs,isEdit}) =>{
    console.log("[Heading] isEdit :",isEdit);
    const isEditMode = getBoolean(isEdit);

    return (
        <>
            {isEditMode &&
                items.map(item =>
                    <div key={item.uuid} {...divs[item.path]}>
                        <Item key={item.uuid}
                              id={item.uuid}
                              locale={locale}
                              isEdit={isEdit}/>
                    </div>
                )
            }
            {!isEditMode &&
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
