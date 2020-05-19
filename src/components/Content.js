import React from "react";
import HowTo from './HowTo'
import About from './About'
import "../css/Content.scss"

// 말풍선 안 내용 (장소이름, 장소설명 + About(글로 설명된 부분))
function Content() {
    return (
        <ul className="contents">
            <li className="content__way">
                <div className="content__title">
                    <p>돌산공원</p>
                </div>
                <HowTo />
            </li>
            <li className="content__place">
                <About />
            </li>
        </ul>
    )
}
export default Content;