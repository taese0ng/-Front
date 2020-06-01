import React, { Component } from 'react';
import '../css/HotList.scss'
import { Link } from "react-router-dom";

function RecommendationLocation(){
    return (
        <>
            <Link className="Link" to='/yourSchedule/detailView'>
                <li className='location'>
                    <p>불국사</p>
                </li>
            </Link>
            <li className='location'>
                <p>한옥마을</p>
            </li>
            <li className='location'>
                <p>엑스포</p>
            </li>
            <li className='location'>
                <p>대백프라자</p>
            </li>
            <li className='location'>
                <p>해운대</p>
            </li>
            <li className='location'>
                <p>D449</p>
            </li>
        </>
    )
}

class HotList extends Component{
    render(){
        return(
            <>
                <p id='hotListTitle'>여긴 어때요? (모두에게 하테하테)</p>
                <ul id="rcmdedLocations">
                    <RecommendationLocation></RecommendationLocation>
                </ul>
            </>
        )
    }
}

export default HotList;