import React, { useState } from "react";
import '../css/Search_bar.scss'
import { connect } from "react-redux";
import { addLocation } from "../store/store";
import MyCalendar from './MyCalendar.jsx'
import { Areas } from '../components/Areas.js'

function Search_bar({locations, addLocations}){
    const [LCategory, setLCategory] = useState(false);
    const [SCategory, setSCategory] = useState(false);
    const [LArea, setLArea] = useState(null);
    
    function clickPlus(){
        setLCategory(LCategory => !LCategory);
        setSCategory(SCategory => false)
    }


    function clickLCategory(area, Area){
      if(LArea === Area && SCategory){
        setSCategory(SCategory => false)
      }
      else{
        setSCategory(SCategory => true);
      }
      setLArea(LArea => Area)
    }

    function choiceArea(SAreaCode, AreaName){
      console.log(LArea.code, SAreaCode);
      setLCategory(LCategory => !LCategory);
      setSCategory(SCategory => !SCategory);
      addLocations(AreaName);
    }

    return (
      <div id="searchbar">
        <section id="section1">
          <MyCalendar/>
          {locations.map((location) => (
            <button {...location} key={location.id} className="middleBtn">
              {location.text}
            </button>
          ))}
          {locations.length <= 1 && (
            <ul>
                <li>
                    <button onClick={clickPlus} className="middleBtn">
                        +
                    </button>
                </li>
                { LCategory && (
                    <li id="largeCategory">
                        <div id="LAreas">
                            <ul>
                            {Areas.map((LArea) =>(
                                <li
                                key={LArea.code}
                                className="LAreaList"
                                id="LArea"
                                onClick={() => clickLCategory(LArea.code, LArea)}
                                >{LArea.bigArea}</li>
                            ))}
                            </ul>
                        </div>
                        <div id="SAreas">
                            { SCategory && (
                                <ul>
                                    {  LArea.areas.map((SArea) =>(
                                        <li
                                        key={SArea.code}
                                        className="SAreaList"
                                        id="SArea"
                                        onClick={()=>choiceArea(SArea.code, SArea.name)}
                                        >{SArea.name}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </li>
                )}
            </ul>
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