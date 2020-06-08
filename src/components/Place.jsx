import React from "react";
import "../css/Place.scss";
import Content from "./Content.jsx";

// 타임라인 위 동그라미 + 말풍선(안에 내용 -> Content)
function Place(props) {
    return (
        <>
            <div className="place__circle"></div>
            <Content info={props.info} index={props.index}/>
        </>
    );
}

export default Place;