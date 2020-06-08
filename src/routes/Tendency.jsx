import React, {useState, useEffect} from "react";
import {Title} from "../components";
import {HopeIP} from '../key'
import axios from 'axios'
import '../css/Tendency.scss'

function Tendency(){
  const [tendency, setTendency] = useState([]);
  const [choice, setChoice] = useState([]);

  useEffect(() => {
      axios.get(`${HopeIP}/api/recommend/testset/`)
      .then(res=>{
          // console.log(res.data)
          // eslint-disable-next-line
          res.data.area.map((element) => {
              setTendency(tendency => [...tendency,res.data.detail[element]])
          })
          
      })
      .catch(err => console.log(err))
  }, [])

  function checkTendncy(e){
    // console.log(e.target.value);
    if(e.target.checked){
      setChoice([...choice, e.target.value])
    }
    else{
      setChoice(choice.filter(element => element !== e.target.value))
    }
  }

  return (
    <>
      <Title></Title>
      <div>
          <ul className='tendency'>
          {tendency.map(element => (
              <li key={element.contentId}>
                  <label>
                      <input type="checkbox" value={element.contentId} onChange={props.method}/>
                      {element.title}
                  </label>
              </li>
          ))}
          </ul>
      </div>
      <Link to='/login'>
        <button className="middleBtn" id="loginBtn">취소</button>
      </Link>
    </>
  );
}

export default Tendency;