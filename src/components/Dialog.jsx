import React from "react";
import { Link } from "react-router-dom";

function Dialog(props) {
    return (
        <div id="Dialog" >
            <p>{props.comment}</p>
            <Link to="/yourSchedule">
                <button onClick={() => {
                    props.onClickOk()
                }}>예</button></Link>
            <button>아니오</button>
        </div>
    );
}

export default Dialog;