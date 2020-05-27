import React from 'react';
import "../css/HowTo.scss";

//아이콘 (버스 택시 도보)
function HowTo() {
    return (
        <ul className="transport_icon">
            <li>
                <img src="https://image.flaticon.com/icons/svg/635/635705.svg" alt="bus"/>
            </li>

            <li>
                <img src="https://image.flaticon.com/icons/svg/2087/2087740.svg" alt="car"/>
            </li>

            <li>
                <img src="https://image.flaticon.com/icons/svg/875/875166.svg" alt="walking"/>
            </li>
        </ul>
    )
}

export default HowTo;