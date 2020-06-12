import React from 'react'
import '../css/Card.scss'

function Card(props){
    const {name, schedule, view, date, cardImg, method} = props
    return(
        <li className="card" onClick={method}>
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
                    {view && 
                        <li>
                            View : {view}
                        </li>
                    }
                    <li>
                        Date : {date}
                    </li>
                </ul>
            </div>
        </li>
    )
}


export default Card;