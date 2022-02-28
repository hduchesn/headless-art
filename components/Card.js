import Image from 'next/image'
import Link from 'next/link'
import RichText from "./text/RichText"

const Card = ({content}) => {
    //TODO replace content by graphQL call, should receive a content id or path
    //TODO for link need to indentify if it is an internal link (use Link) or external link (use <a>)
    return (
        <div className="media d-block media-custom text-center">
            {/*<Link href={{*/}
            {/*    pathname:content.linkTo*/}
            {/*}}>*/}
                <a href={content.linkTo}>
                    {/*<Image*/}
                    {/*    priority*/}
                    {/*    src={content.image}*/}
                    {/*    className="img-fluid"*/}
                    {/*    height={700}*/}
                    {/*    width={700}*/}
                    {/*    // layout='fill'*/}
                    {/*    alt="Team member"*/}
                    {/*/>*/}
                </a>
            {/*</Link>*/}
            <RichText content={content.body}/>
        </div>
    )
}

export default Card
