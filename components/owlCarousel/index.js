import OWCHeading from "./heading"

const OwlCarousel = ({type}) =>{
    if(type==="heading")
        return(
            <OWCHeading/>
        )
    return(
        <p>oups ca plante</p>
    )
}

export default OwlCarousel;
