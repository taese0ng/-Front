import React from "react";
import HowTo from './HowTo.jsx'
import About from './About.jsx'
import "../css/Content.scss"

// 말풍선 안 내용 (장소이름, 장소설명 + About(글로 설명된 부분))
function Content(props) {
    return (
        <ul className="contents">
            <li className="content__way">
                <div className="content__title">
                    <p>{props.info.name}</p>
                </div>
                {props.mapState && 
                    <HowTo info={props.info} index={props.index}/>
                }
            </li>
            <li className="content__place">
                <About info={props.info}/>
            </li>
        </ul>
    )
}
export default Content;