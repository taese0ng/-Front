import React, { Component } from 'react';
import '../css/HotList.scss'
import { Link } from "react-router-dom";
import axios from 'axios';
import {HopeIP} from '../key'
import update from 'react-addons-update';

function RecommendationLocation(props){
    return (
        <Link className="Link" to={`/yourSchedule/detailView/${props.info.contentId}`}>
            <li className='location'>
                <p>{props.info.title}</p>
            </li>
        </Link>
    )
}

class HotList extends Component{
    constructor(props){
        super(props);
        this.state = {
            locations : []
        }
    }

    componentWillMount(){
        axios.get(`${HopeIP}/api/recommend/byuser?userid=jn8121@naver.com`)
        .then(res => {
            console.log(res.data)
            res.data.area.map((element) => {
                this.setState({
                    locations : update(
                        this.state.locations, {
                            $push: [res.data.detail[element]]
                    })
                });
                return 0;
            })
        })
        .catch(err => console.log(err))
    }

    render(){
        return(
            <>
                <p id='hotListTitle'>여긴 어때요? (모두에게 하테하테)</p>
                <ul id="rcmdedLocations">
                    {this.state.locations.map((location, index) => (
                        <RecommendationLocation info = {location} key={index}/>
                    ))}
                </ul>
            </>
        )
    }
}

export default HotList;