const HalfBlock = () => {
    return (
        <section>
            <div className="half d-lg-flex d-block">
                <div className="image element-animate" data-animate-effect="fadeIn"
                     style={{backgroundImage: "url('/static/img/industrial_hero_1.jpg')"}}></div>
                <div className="text text-center element-animate">
                    <h3 className="mb-4">Our Mission</h3>
                    <p className="mb-5">Far far away, behind the word mountains, far from the countries Vokalia and
                        Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the
                        coast of the Semantics, a large language ocean.</p>
                    <p><a href="#" className="btn btn-primary btn-sm px-3 py-2">Learn More</a></p>
                </div>
            </div>

            <div className="half d-lg-flex d-block">
                <div className="image order-2 element-animate" data-animate-effect="fadeIn"
                     style={{backgroundImage: "url('/static/img/industrial_hero_2.jpg')"}}></div>
                <div className="text text-center element-animate">
                    <h3 className="mb-4">Company History</h3>
                    <p className="mb-5">Far far away, behind the word mountains, far from the countries Vokalia and
                        Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the
                        coast of the Semantics, a large language ocean.</p>

                    <p><a href="#" className="btn btn-primary btn-sm px-3 py-2">Learn More</a></p>
                </div>
            </div>
        </section>
    )
}

export default HalfBlock;
