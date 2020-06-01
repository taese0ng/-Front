import React, {Component} from'react'
import '../css/Review.scss'
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'

class Review extends Component{
    render(){
        return(
            <div id='review'>
                <div>
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                    <Rater color="red" total={5} rating={2} />
                    <button className="middleBtn" id="reviewBtn">작성</button>
                </div>
                <ul id='reviewContents'>
                    <li className='reviewContent'>
                        <ul>
                            <li id="reviewTitle">
                                제목 날짜
                            </li>
                            <li id='reviewContent'>
                                내용
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Review;