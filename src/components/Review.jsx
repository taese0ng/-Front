import React, {useState} from'react'
import '../css/Review.scss'
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'

function Review(props){
    const [comment, setComment] = useState("")

    function inputComment(e){
        setComment(e.target.value)
    }
    return(
        <div id='review'>
            <div>
                <textarea onChange={inputComment} id="textArea" cols="30" rows="10"></textarea>
                <Rater color="red" total={5} rating={2} />
                <button onClick={()=>{
                    props.submitMethod(comment)
                    const textArea = document.querySelector("#textArea")
                    textArea.value = ""
                    setComment("")
                }} className="middleBtn" id="reviewBtn">작성</button>
            </div>
            <ul id='reviewContents'>
            {props.commentsInfo.length === 0 ? 
            <>
                <li className='reviewContent'>
                    <ul>
                        <li id="reviewTitle">
                            작성자가 없습니다.
                        </li>
                        
                        <li id='reviewContent'>
                            내용이 없습니다.
                        </li>
                    </ul>
                </li>
            </>:
            <>
                {props.commentsInfo.map((element)=>(
                    <li className='reviewContent' key={element._id}>
                        <ul>
                            <li id="reviewTitle">
                                {element.author.name}
                                <button className="middleBtn" id="reviewBtn" 
                                onClick={()=>props.delComment(element._id)}>
                                    삭제
                                </button>
                            </li>
                            
                            <li id='reviewContent'>
                                {element.comment}
                            </li>
                        </ul>
                    </li>
                ))}
            </>
            }
            </ul>
        </div>
    )
}

export default Review;