import React, { useState } from "react";
import '../css/Search_bar.scss'
import { connect } from "react-redux";
import { addLocation } from "../store/store";
import MyCalendar from './MyCalendar'


function Search_bar({locations, addLocations, setOpenCalendar}){
    const [text, setText] = useState(0);
    function clickPlus(){
        setText(text => text+1);
        addLocations(text);
    }

    return (
      <div id="searchbar">
        <section id="section1">
          <MyCalendar/>
          {/* <button className="middleBtn" onClick={clickCalendar}>여행 날짜</button> */}
          {locations.map((location) => (
            <button {...location} key={location.id} className="middleBtn">
              {location.id}
            </button>
          ))}
          {locations.length <= 1 && (
            <button onClick={clickPlus} className="middleBtn">
              +
            </button>
          )}
        </section>

        <section id="section2">
          {locations.length > 0 ? (
            <button className="searchBtn" id="Activation">
              추천시작
            </button>
          ) : (
            <button className="searchBtn">추천시작</button>
          )}
        </section>
      </div>
    );
}

function mapStateToProps(state) {
  return { 
    locations: state.location,
   };
}

function mapDispatchToProps(dispatch) {
  return { 
    addLocations: (text) => dispatch(addLocation(text)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (Search_bar);