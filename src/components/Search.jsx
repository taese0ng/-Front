import React, { useState } from "react";
import SearchResult from './SearchResult'
import axios from 'axios';

import {HopeIP} from '../key'


function Search(props) {
  const [result, setResult] = useState([])
  const [item, setItem] = useState([])


  function InputItem(e){
    setItem(e.target.value);
  }

  function Clicks(e) {

    e.preventDefault();

    axios.get(`${HopeIP}/api/search/area?areaCode=32&search=${item}`)
      .then((res) => {
        console.log(res)
        let list = []
        res.data.map((item, index) => {
          list.push(item);
        })
        setResult(list)
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div>
      <form onSubmit={Clicks}>

        <input className="InputInfo" onChange={InputItem} value={item}/>
        <button>SEARCH</button>
          {result.map(element => (
            <SearchResult info={element} key={element.contentId} />
          ))}
      </form>
    </div>
  );
}

export default Search;