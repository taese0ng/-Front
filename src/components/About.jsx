import React from "react";
import "../css/About.scss";
import AboutContent from './AboutContent.jsx';
import AboutAddress from './AboutAddress.jsx';
// 주소, 이용시간, 쉬는 날 , 연락처, 입장료, 주차시설
function About(props) {
    return (
        <>
            <AboutContent info={props.info}/>
            <AboutAddress/>
        </>
    )
}

export default About;