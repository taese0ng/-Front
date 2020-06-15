import React from 'react'
import '../css/MenuBar.scss'
import { Link } from "react-router-dom";
import hamgurger from "../assets/hamburgerMenu.png";

var open = false;

function MenuBar({location}){
    window.onresize = function (event) {
      if (this.window.outerWidth > 725){
        try{
          document.getElementById("section1").style.left="-100vw";
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
      if(open&& window.innerWidth<725){
        document.getElementById("section1").style.left = "0";
        document.querySelector("body").style.overflow = "hidden";
      }else{
        document.getElementById("section1").style.left = "-100vw";
        document.querySelector("body").style.overflow = "unset";
      }
    }
    
    function LogOut(){
      sessionStorage.removeItem("token")
      sessionStorage.removeItem("user");
      window.location.reload();
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
          <Link to="/yourSchedule/myschedule" className="Link" onClick={clickMenu}>
            {location.pathname === "/yourSchedule/myschedule" ? (
              <p id="MySchedule">My Schedule</p>
            ) : (
              <p>My Schedule</p>
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
          <Link to='/yourSchedule/profile' className="Link">
            <p>{JSON.parse(sessionStorage.getItem('user')).name}</p>
            </Link>
          <Link to="/login" className="Link">
            <button className="smallBtn" onClick={LogOut}>Log out</button>
          </Link>
        </section>
      </div>
    );
}

export default MenuBar;