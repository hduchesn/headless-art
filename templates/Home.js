import Area from "../components/jahia/Area";
import components from "../components/";

const Home = ({templateName,path,isEdit,locale}) => {

console.log("[Home] templateName : ",templateName);
    return(
        <>

            {/*<Nav/>*/}
            {/*<p style={{color:"red"}}>hardcoded area 1</p>*/}
            {/*<Area name="testArea" mainResourcePath={path}/>*/}
            <Area
                name="testArea"
                mainResourcePath={path}
                components={components}
                isEdit={isEdit}
                locale={locale}/>



            {/*<p style={{color:"red"}}>hardcoded area 2</p>*/}

            <Area
                name="testArea2"
                mainResourcePath={path}
                components={components}
                isEdit={isEdit}
                locale={locale}/>

            {/*<AreaJ name="HD_Are" mainResourcePath={path}/>*/}
            <div className="top-shadow"></div>
            {/*<Hero/>*/}
            {/*<HalfBlock/>*/}
            {/*<section className="section bg-light">*/}
            {/*    <div className="container">*/}
            {/*        <div className="row">*/}
            {/*            <Area*/}
            {/*                name="mediaBloc"*/}
            {/*                mainResourcePath={path}*/}
            {/*                components={components}*/}
            {/*                isEdit={isEdit}*/}
            {/*                locale={locale}/>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}
            {/*<Area*/}
            {/*    name="mediaBloc2"*/}
            {/*    mainResourcePath={path}*/}
            {/*    components={components}*/}
            {/*    isEdit={isEdit}*/}
            {/*    locale={locale}/>*/}
            {/*<section className="section">*/}
            {/*    <div className="container">*/}
            {/*        <div className="row justify-content-center mb-5 element-animate">*/}
            {/*            <div className="col-md-8 text-center">*/}

            {/*                <RichText content={`<h2 class="heading mb-4">Meet The Team</h2>*/}
            {/*                <p class="mb-5 lead">Far far away, behind the word mountains, far from the countries*/}
            {/*                    Vokalia and Consonantia, there live the blind texts. Separated they live in*/}
            {/*                    Bookmarksgrove.</p>`}/>*/}

            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className="row">*/}
            {/*            {content?.cards?.map((card,index) => (*/}
            {/*                <div key={index} className="col-lg-3">*/}
            {/*                    <Card  content={card}/>*/}
            {/*                </div>*/}
            {/*            ))}*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}

        </>

    )
}
export default Home;


