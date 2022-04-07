import React from 'react';
// import PropTypes from "prop-types";
import Image from './components/Image';
import Video from './components/Video';
import jahia from '../../../jahia';

function Media({id, type, mixins, path, sourceID, alt}) {
    // const { state } = React.useContext(StoreContext);
    // const {cnd_type,files_endpoint} = state.jContent;

    // console.log("Media equals: ",type === cnd_type.WIDEN_IMAGE)
    let component = <></>;
    switch (type) {
        // case jahia.cnd_type.WIDEN_IMAGE :
        //     component = <WidenImage uuid={id} />
        //     break;
        //
        // case jahia.cnd_type.WIDEN_VIDEO :
        //     component = <WidenVideo uuid={id} ownerID={sourceID} />
        //     break;

        case jahia.cnd_type.EXT_VIDEO:
            component = <Video url={path} ownerID={sourceID}/>
            break;

        case jahia.cnd_type.JNT_FILE:
            if (mixins.includes(jahia.cnd_type.IMAGE)) {
                component = <Image path={path} alt={alt}/>
            } else {
                component = <Video url={encodeURI(path)} ownerID={sourceID}/>
            }
            break;

        default:
            if (path) {
                component = <Image path={path} alt={alt}/>
            }
            break;
    }
    // console.log("Media component: ",component)
    return (component)
}

// Media.propTypes={
//     id:PropTypes.string,
//     type:PropTypes.string,
//     mixins:PropTypes.array,
//     path:PropTypes.string,
//     sourceID:PropTypes.string,
//     alt:PropTypes.string
// }

export default Media;
