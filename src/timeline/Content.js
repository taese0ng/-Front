import React from "react";
import HowTo from './HowTo'
import About from './About'
import "./Content.scss"


// 말풍선 안 내용 (장소이름, 장소설명 + About(글로 설명된 부분))
function Content() {
    return (
        <div>
            <div className="content__title">
                <p>돌산공원</p>
            </div>
            <div className="content__how">
                <HowTo />
            </div>
            <div className="content__place">
                <img src="http://tong.visitkorea.or.kr/cms/resource/19/2653419_image2_1.jpg" alt="엑스포"></img>
                <About />
            </div>
        </div>
    )
}
export default Content;