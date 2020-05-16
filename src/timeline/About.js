import React from "react";
import "./About.scss";

// 주소, 이용시간, 쉬는 날 , 연락처, 입장료, 주차시설
function About() {
    return (
        <div className="about__data">
            <h1 className="about__name">돌산공원</h1>
            <h5 className="about__description">돌산공원은 돌산대교와 마주보는 자리에 위치하고 하고 있으며 87,000여평의 부지에 1987년 조성되었다. 공원에는 2004년 sbs아침드라마 “선택” 세트 촬영장이 설치되어 많은 관광객들이 관람하고 있으며, 세트장의 일부를 전통찻집으로 개조하여 돌산대교를 바라보며 차를 마시는 풍경이 일품이다. 공원의 뷰포인트에서 바라보는 돌산대교 머리위로 지는 해넘이와 돌산대교 야경, 그리고 여수시 중앙동과 종화동을 아우르는 해양공원의 야경, 장군도 야경 등을 바라보는 경치 또한 장관이다. 중앙부지에는 1994년 삼여통합과 관련된 각종 자료가 타임캡슐 안에 보관되어 100년 후에 공개할 예정이다.</h5>
            <div className="about__notice">
                <div className="about__adress">
                    <h4 className="about__title">주소  </h4>
                    <h4 className="about__content"> 전라남도 여수시 돌산읍 돌산로 3600-1 (돌산읍)</h4>
                </div>
                <div className="about__hours">
                    <h4 className="about__title">이용시간  </h4>
                    <h4 className="about__content"> 상시 가능</h4>
                </div>
                <div className="about__dayoff">
                    <h4 className="about__title">쉬는 날 </h4>
                    <h4 className="about__content"> 연중무휴</h4>
                </div>
                <div className="about__phone">
                    <h4 className="about__title">연락처 </h4>
                    <h4 className="about__content"> 061-659-4628</h4>
                </div>
                <div className="about__fee">
                    <h4 className="about__title">입장료  </h4>
                    <h4 className="about__content"> 무료</h4>
                </div>
                <div className="about__parking">
                    <h4 className="about__title">주차시설  </h4>
                    <h4 className="about__content"> 주차 가능(승용차 150대, 대형차 15대) / 무료</h4>
                </div>
            </div>
        </div>
    )
}

export default About;