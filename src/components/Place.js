import React from "react";
import "../css/Place.scss";
import Content from "./Content";

// 타임라인 위 동그라미 + 말풍선(안에 내용 -> Content)
function Place() {
    return (
        <li>
            <div className="place__circle"></div>
            <Content/>
        </li>

    );
}

export default Place;