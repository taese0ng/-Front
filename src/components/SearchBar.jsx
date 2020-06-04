import React, { useState } from "react";
import '../css/SearchBar.scss'
import MyCalendar from './MyCalendar.jsx'
import { Areas } from '../components/Areas.js'

function Search_bar(){
    const [LCategory, setLCategory] = useState(false);
    const [SCategory, setSCategory] = useState(false);
    const [LArea, setLArea] = useState(null);
    const [locations, setLocations] = useState([]);
    
    function addLocations(location){
      setLocations([...locations, location])
    }

    function clickPlus(){
      let LList = document.getElementById('LAreas')
      let SList = document.getElementById('SAreas')
      LList.style.transition='0.5s all'
      SList.style.transition='0.5s all'
      if(!LCategory){
        LList.style.height='300px'
      }
      else{
        LList.style.height='0px'
        SList.style.height='0px'
      }
      setLCategory(LCategory => !LCategory);
      setSCategory(SCategory => false)
    }


    function clickLCategory(LAreaCode, Area){
      let LList = document.getElementById('LAreas')
      let SList = document.getElementById('SAreas')
      if(Area.areas.length===0){
        for(let i =0; i<locations.length; i++){
          if(locations[i] === Area){
            console.log("dd")
            return;
          }
        }
        setLCategory(LCategory => !LCategory);
        setSCategory(SCategory => false);
        addLocations(Area);
        LList.style.height='0px'
        SList.style.height='0px'
        LList.style.transition='0s'
        SList.style.transition='0s'
        console.log(Area.code, 0);
      }
      else{
        SList.style.transition='0.5s all'
        
        if(LArea === Area && SCategory){
          setSCategory(SCategory => false)
          SList.style.height='0px'
        }
        else{
          setSCategory(SCategory => true);
          SList.style.height='400px'
        }
        setLArea(LArea => Area)
      }
    }

    function choiceArea(SAreaCode, Area){
      console.log(LArea.code, SAreaCode);
      for(let i =0; i<locations.length; i++){
        if(locations[i] === Area){
          return;
        }
      }
      let LList = document.getElementById('LAreas')
      let SList = document.getElementById('SAreas')
      LList.style.height='0px'
      SList.style.height='0px'
      LList.style.transition='0s'
      SList.style.transition='0s'
      setLCategory(LCategory => !LCategory);
      setSCategory(SCategory => !SCategory);
      addLocations(Area);
    }

    function resetBtn(){
      if(locations.length < 2){
        let LList = document.getElementById('LAreas')
        let SList = document.getElementById('SAreas')
        LList.style.height='0px'
        SList.style.height='0px'
        LList.style.transition='0s'
        SList.style.transition='0s'
      }
      setLocations([])
      setLCategory(LCategory => false);
      setSCategory(SCategory => false)
    }

    return (
      <div id="searchbar">
        <section id="section1">
          <MyCalendar/>
          {locations.map((location) => (
            <button {...location} key={location.code} className="middleBtn">
              {location.name}
            </button>
          ))}
          {locations.length <= 1 && (
            <ul>
                <li>
                    <button onClick={clickPlus} className="middleBtn">
                        +
                    </button>
                </li>
                <li id="largeCategory">
                    <div id="LAreas">
                        <ul>
                        {Areas.map((LArea) =>(
                            <li
                            key={LArea.code}
                            className="LAreaList"
                            id="LArea"
                            onClick={() => clickLCategory(LArea.code, LArea)}
                            >{LArea.name}</li>
                        ))}
                        </ul>
                    </div>
                    <div id="SAreas">
                        { LArea && (
                            <ul>
                                {  LArea.areas.map((SArea) =>(
                                    <li
                                    key={SArea.code}
                                    className="SAreaList"
                                    id="SArea"
                                    onClick={()=>choiceArea(SArea.code, SArea)}
                                    >{SArea.name}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                </li>
            </ul>
          )}
        </section>

        <section id="section2">
          <button className="searchBtn" id="Activation" onClick={resetBtn}>초기화</button>
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

export default Search_bar;