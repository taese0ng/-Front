import React, {Component} from 'react'
import {Timeline} from '../components'

class Schedule extends Component{
    render(){
        return(
            <div style={{textAlign:`center`}} className="footer__height">
                <Timeline/>
            </div>
        )
    }
}

export default Schedule;