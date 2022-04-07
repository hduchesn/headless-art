import React from "react";
// import PropTypes from "prop-types";
import VideoPlayer from "../../VideoPlayer";

function Video({url, ownerID}) {


    return (
        <VideoPlayer
            videoURL={url}
            ownerID={ownerID}
        />
    )
}

// Video.propTypes={
//     url:PropTypes.string.isRequired,
//     ownerID:PropTypes.string.isRequired,
// }

export default Video;
