import React from 'react';
import "../css/HowTo.scss";
import how from '../assets/icon_howto.png';
import { connect } from "react-redux";

//아이콘 (버스 택시 도보)
function HowTo(props) {
    //console.log("하우투nn",props.schedule);
    
    let start = props.schedule[(props.index-1)];
    let end = props.schedule[props.index];
    //console.log("하우투",props.index,start,end);
    if(start==null){
        return (
            <ul className="transport_icon">
                <li>
                    <a href={"https://map.kakao.com/?q="+end} target = "_blank" rel="noopener noreferrer">
                    <img src={how} alt='HowToGo'/>
                    
                    </a>
                </li>
            </ul>
        ) 

    }
    else{
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
   
}

function mapStateToProps(state) {
    return { 
       schedule:state.schedule
     };
  }

export default connect(mapStateToProps) (HowTo);