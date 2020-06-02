import React from "react";
import logo from '../assets/logo.png';

function Title(){
    return (
      <>
        <img id="logoImg" src={logo} alt='logo'/>
        {/* <h1 className="title" id="signTitle">
          너의 일정을 짜고 싶어
        </h1> */}
      </>
    );
}

export default Title;