import React, {useState, useEffect} from 'react'
import {HopeIP} from '../key'
import axios from 'axios'
import '../css/Tendency.scss'

function Tendency(){
    const [tendency, setTendency] = useState([]);

    useEffect(() => {
        axios.get(`${HopeIP}/api/recommend/gettendency/`)
        .then(res=>{
            // eslint-disable-next-line
            res.data.area.map((element) => {
                setTendency(tendency => [...tendency,res.data.detail[element]])
            })
            
        })
        .catch(err => console.log(err))
    }, [])

    return(
        <div>
            <ul className="tendency">
            {tendency.map((element) => (
                <li key={element.contentId}>
                    <label><input type="checkbox" value={element.title}/>{element.title}</label>
                </li>
            ))}
            </ul>
        </div>
    )
}

export default Tendency;