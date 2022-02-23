import React, {useEffect} from 'react';
import Image from 'next/image';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

import Item from './Item'

const Heading = () =>{
    const gql={
        options:{}
    };
    const sliderId = Math.ceil(Math.random()* 100000);

    useEffect(() => {
        const options = Object.assign({
            loop:true,
            autoplay: true,
            margin:0,
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            nav:true,
            autoplayHoverPause: true,
            items: 1,
            dragTouch: false,
            navText : ["<span class='ion-chevron-left'></span>","<span class='ion-chevron-right'></span>"],
            responsive:{
                0:{
                    items:1,
                    nav:false
                },
                600:{
                    items:1,
                    nav:false
                },
                1000:{
                    items:1,
                    nav:true
                }
            }
        },gql.options);



        window.jQuery(`#${sliderId}`).owlCarousel(options)
        // window.jQuery = require('../public/jquery-latest.min');
        // window.Diamonds = require('../public/jquery.diamonds.js');
        //
        // window.jQuery("#demo").diamonds({
        //     size : 100, // Size of diamonds in pixels. Both width and height.
        //     gap : 5, // Pixels between each square.
        //     hideIncompleteRow : false, // Hide last row if there are not enough items to fill it completely.
        //     autoRedraw : true, // Auto redraw diamonds when it detects resizing.
        //     itemSelector : `.${styles.item}` // the css selector to use to select diamonds-items.
        // });
    }, []);//gql.options,sliderId



    const items=[
        {
            caption:`<h1 className="mb-4"><span>We Are Industrial Company</span></h1>
                        <p className="mb-5 w-75">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
                            iste ipsa excepturi nostrum sequi molestias?</p>`,
            image:"/img/industrial_hero_1"
        }
    ];
    //
    return(
        <section id={sliderId} className="home-slider owl-carousel">
            {/*{items.forEach( (item,index) =>*/}
                    <div className="slider-item" style={{backgroundImage: "url('/static/img/industrial_hero_1.jpg')"}}>
                        {/*<Image src='/static/img/industrial_hero_1.jpg'*/}
                        {/*       height={900}*/}
                        {/*       width={1900}*/}
                        {/*/>*/}
                        <div className="container">
                            <div className="row slider-text align-items-center justify-content-center">
                                <div className="col-lg-7 text-center col-sm-12 element-animate">
                                    <div className="btn-play-wrap mx-auto"><p className="mb-4"><a
                                        href="https://vimeo.com/59256790" data-fancybox data-ratio="2"
                                        className="btn-play"><FontAwesomeIcon icon={faPlay} /></a></p></div>
                                    <h1 className="mb-4"><span>We Are Industrial Company</span></h1>
                                    <p className="mb-5 w-75">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        Alias iste ipsa excepturi nostrum sequi molestias?</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="slider-item" style={{backgroundImage: "url('/static/img/industrial_hero_2.jpg')"}}>
                        {/*<Image src='/static/img/industrial_hero_1.jpg'*/}
                        {/*       height={900}*/}
                        {/*       width={1900}*/}
                        {/*/>*/}
                        <div className="container">
                            <div className="row slider-text align-items-center justify-content-center">
                                <div className="col-lg-7 text-center col-sm-12 element-animate">
                                    <div className="btn-play-wrap mx-auto"><p className="mb-4"><a
                                        href="https://vimeo.com/59256790" data-fancybox data-ratio="2"
                                        className="btn-play"><span className="ion ion-ios-play"></span></a></p></div>
                                    <h1 className="mb-4"><span>The Best Level of Excellence in Steel Fabrication</span></h1>
                                    <p className="mb-5 w-75">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        Alias iste ipsa excepturi nostrum sequi molestias?</p>
                                </div>
                            </div>
                        </div>
                    </div>

                {/*// <Item*/}
                {/*//     key={index}*/}
                {/*//     caption={item.caption}*/}
                {/*//     image={item.image}*/}
                {/*// />*/}
                    {/*)}*/}
        </section>
    )
}
export default Heading;
