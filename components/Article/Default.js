
const Default = ({body,image,imagePosition}) =>{

    return (
        <section className="section element-animate">
            <div className="container">
                <div className="row align-items-center mb-5">
                    <div className="col-lg-7 order-md-2">
                        <div className="scaling-image">
                            <div className="frame">
                                <img src="images/industrial_featured_img_1.jpg"
                                alt="Free template by Free-Template.co" className="img-fluid"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 pr-md-5 mb-5">
                        <div className="block-41">
                            <h2 className="block-41-heading mb-5">Let's Build Together</h2>
                            <div className="block-41-text">
                                <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
                                    there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the
                                    Semantics, a large language ocean.</p>
                                <p><a href="#" className="readmore">Read More <span
                                    className="ion-android-arrow-dropright-circle"></span></a></p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Default;

