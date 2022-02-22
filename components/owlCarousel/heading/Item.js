


const Item = ({caption,image}) => {
    // <div className="slider-item" style="background-image: url('/img/industrial_hero_1');">
    return (
        <div className="slider-item" style={`background-image: url('${image}');`}>
            <div className="container">
                <div className="row slider-text align-items-center justify-content-center">
                    <div className="col-lg-7 text-center col-sm-12 element-animate">
                        <div className="btn-play-wrap mx-auto"><p className="mb-4"><a
                            href="https://vimeo.com/59256790" data-fancybox data-ratio="2"
                            className="btn-play"><span className="ion ion-ios-play"></span></a></p></div>
                        <div dangerouslySetInnerHTML={caption}></div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Item;
