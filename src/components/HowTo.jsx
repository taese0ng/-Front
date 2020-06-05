import React from 'react';
import "../css/HowTo.scss";
import how from '../assets/icon_howto.png';
import { connect } from "react-redux";

//아이콘 (버스 택시 도보)
function HowTo(props) {
    let start = props.schedule[props.index];
    let end = props.schedule[(props.index+1)];
    return (
        <ul className="transport_icon">
             <li>
                <a href={"https://map.kakao.com/?sName="+start+"&eName="+end} target = "_blank" rel="noopener noreferrer">
                <img src={how} alt='HowToGo'/>

                </a>
            </li>
        </ul>
    ) 
}

function mapStateToProps(state) {
    return { 
       schedule:state.schedule
     };
  }

export default connect(mapStateToProps) (HowTo);