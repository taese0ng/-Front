import React from "react";
import { Link} from "react-router-dom";
import '../css/Dialog.scss'

function Dialog(props) {
    return (
        <div id="Dialog" className={props.className} onClick={props.onCancel}>
            <div id="DialogForm" onClick={(e)=>e.stopPropagation()}>
                <p id="DialogComment">{props.comment}</p>
                <Link to="/yourSchedule">
                    <button onClick={() => {
                        props.onCancel()
                        props.onClickOk()
                    }}>예</button>
                </Link>
                <button onClick={props.onCancel}>아니오</button>
            </div>
        </div>
    );
}

export default Dialog;