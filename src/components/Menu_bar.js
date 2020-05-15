import React from 'react'
import '../css/Menu_bar.scss'
import { Link } from "react-router-dom";
import hamgurger from "../assets/hamburgerMenu.png";

var open = false;

function Menu_bar({location}){
    var name = localStorage.getItem('name');

    window.onresize = function (event) {
      if (this.window.outerWidth > 725){
        try{
        document.getElementById("section1").style.left="-60vw";
        }catch(error){

        }
        open = false;
      }
    };
    function clickMenu(){
      open = !open;
      isOpen()
    }
    function isOpen(){
      open
        ? (document.getElementById("section1").style.left = "0")
        : (document.getElementById("section1").style.left = "-60vw");
    }
    
    function LogOut(){
      localStorage.removeItem("token")
      localStorage.removeItem("name");
    }
    return (
      <div id="menubar">
        <section id="hamburger" onClick={clickMenu}>
          <img src={hamgurger} alt="hamburgerMenu" />
        </section>
        <section id="section1">
          <Link to="/yourSchedule" className="Link" onClick={clickMenu}>
            {location.pathname === "/yourSchedule" ? (
              <p id="Home">Home</p>
            ) : (
              <p>Home</p>
            )}
          </Link>
          <Link to="/yourSchedule/mypages" className="Link" onClick={clickMenu}>
            {location.pathname === "/yourSchedule/mypages" ? (
              <p id="MyPage">My Page</p>
            ) : (
              <p>My Page</p>
            )}
          </Link>
          <Link
            to="/yourSchedule/sharepage"
            className="Link"
            onClick={clickMenu}
          >
            {location.pathname === "/yourSchedule/sharepage" ? (
              <p id="SharePage">Share Page</p>
            ) : (
              <p>Share Page</p>
            )}
          </Link>
        </section>
        <section id="section2">
            <p>{name}</p>
          <Link to="/login" className="Link">
            <button className="smallBtn" onClick={LogOut}>Log out</button>
          </Link>
        </section>
      </div>
    );
}

export default Menu_bar;