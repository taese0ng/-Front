import React from 'react'
import '../css/Card.scss'

function Card(props){
    const {name, schedule, view, date, cardImg} = props
    return(
        <li className="card">
            <div id='cardImg'>
                <img alt="dd" src={cardImg}/>
            </div>
            <div id="CardContent">
                <ul>
                    <li id="scheduleName">
                        {schedule}
                    </li>
                    <li>
                        {name}
                    </li>
                    <li>
                        View : {view}
                    </li>
                    <li>
                        Date : {date}
                    </li>
                </ul>
            </div>
        </li>
    )
}


export default Card;