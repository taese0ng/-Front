import React, {Component} from 'react'
import {Timeline_R} from '../components'


class Recommend extends Component{
    render(){
        const area = this.props.match.params.area;
        console.log("추천시작",area)
        return(
            <div style={{textAlign:`center`}} className="footer__height">
                <Timeline_R info={area}/>
            </div>
        )
    }
}

export default Recommend;