import React, { Component } from 'react';
import arrowRight from '../assets/arrow-right.png'
import arrowLeft from '../assets/arrow-left.png'
import '../css/Banner.scss'

var imgs;
var img_count;
var img_position = 1;
var dots;

function back(){
    if(1<img_position){
        console.log("back");
        imgs.style.left= (img_count-img_position-1)*100+'%';
        img_position--;
        dots[img_position].style.backgroundColor = 'rgb(116, 116, 116)';
        dots[img_position-1].style.backgroundColor = "red";
    }
}

function next(){
    if(img_count>img_position){
        console.log("next")
        imgs.style.left= -img_position*100+'%';
        img_position++;
        dots[img_position-2].style.backgroundColor = 'rgb(116, 116, 116)';
        dots[img_position-1].style.backgroundColor = "red";
    }
}

class Banner extends Component{

    componentDidMount(){
        imgs = document.getElementById('imgList');
        img_count = imgs.childElementCount;
        dots = document.getElementsByClassName('dot');
        dots[0].style.backgroundColor = "red";
    }
    
    
    render(){
        return (
            <>
                <div id="Banner">
                    <img onClick={back} id="leftArrow" width="50px" src={arrowLeft} alt="arrow-left"/>
                    <ul id="imgList">
                        <li>
                            <img src="https://travelpost.kr/wp-content/uploads/2015/12/venice.jpg" alt="xx"/>
                        </li>
                        <li>
                            <img src="https://t1.daumcdn.net/cfile/tistory/997861485CE3D49F25" alt="xx"/>
                        </li>
                        <li>
                            <img src="https://img.huffingtonpost.com/asset/5d81573a230000580556dcd2.jpeg?ops=scalefit_630_noupscale" alt="xx"/>
                        </li>
                    </ul>
                    <img onClick={next} id="rightArrow" width="50px" src={arrowRight} alt="arrow-right"/>
                </div>
                <ul id="dotList">
                    <li className="dots">
                        <div className="dot"></div>
                    </li>
                    <li className="dots">
                        <div className="dot"></div>
                    </li>
                    <li className="dots">
                        <div className="dot"></div>
                    </li>
                </ul>
            </>
        )
    }
    
}


export default Banner;