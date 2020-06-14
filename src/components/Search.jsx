import React, { useState } from "react";
import axios from 'axios';
import {HopeIP} from '../key'
import '../css/Search.scss';
import { connect } from "react-redux";


function SearchResult(props) {
  return (
      <li id="searchItem" onClick={() => {
        props.addSchedule(props.info) 
        props.clickAddBtn()}}>
          <img src={props.info.firstImage} alt={props.info.name}/>
          <p>{props.info.title}</p>
      </li>
  );
}


function Search(props) {
  const [result, setResult] = useState([])
  const [item, setItem] = useState([])

  function InputItem(e){
    setItem(e.target.value);
  }

  function Clicks(e) {
    e.preventDefault();
    setResult([])
    props.AreaCodes.forEach(el => {
      // console.log(el)
      axios.get(`${HopeIP}/api/search/area?areaCode=${el.areaCode}&sigunguCode=${el.sigunguCode}&search=${item}`)
        .then((res) => {
          console.log(res)
          res.data.forEach((item) => {
            setResult(result => [...result, item])
          })
        })
        .catch(err => {
          console.log(err);
        })
    })
  }

  function Block(e){
    e.stopPropagation();
  }

  return (
    <div id="Search" onClick={()=>{
      setResult([])
      setItem([])
      props.clickAddBtn()
      }} className={props.className}>
      <div id="SearchForm" onClick={Block}>
        <form onSubmit={Clicks}>
          <input onChange={InputItem} value={item}/>
          <button id="searchBtn">SEARCH</button>
        </form>
        <ul id="searchList">
          {result.map(element => (
              <SearchResult addSchedule={props.addSchedule} clickAddBtn={props.clickAddBtn} info={element} key={element.contentId} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return { 
     AreaCodes: state.AreaCodes,
   };
}


export default connect(mapStateToProps) (Search);