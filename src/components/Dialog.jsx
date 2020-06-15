import React from "react";
import { Link } from "react-router-dom";



function Dialog(props) {
    return (
        <div id="Dialog" >
            <p>진짜 삭제하시겠습니까?</p>
            <Link to="/yourSchedule">
                <button onClick={() => {
                    props.clickDelSchedule()}}>
                    예</button></Link>
            <button>아니오</button>
        </div>
    );
}


export default Dialog;