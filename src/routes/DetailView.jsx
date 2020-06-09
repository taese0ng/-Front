import React, {useEffect, useState} from 'react'
import '../css/DetailView.scss'
import AboutContent from '../components/AboutContent.jsx';
import Review from'../components/Review.jsx';
import axios from 'axios';
import {HopeIP, ServerIP} from '../key'
import {useParams} from 'react-router-dom'

//192.168.0.21:3000/#/yourSchedule/detailView/
function DetailView(){
    const { id } = useParams();
    const [contentId, setContentId] = useState(null);
    const [comments, setComments] = useState([]);
    useEffect(() => {
        // console.log(this.props.match.params.id)
        axios.get(`${HopeIP}/api/recommend/areadata/${id}`)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err);
        })

        axios.get(`${ServerIP}/content/${id}`)
        .then(res =>{
            setContentId(res.data.content._id)
            let ans = []
            res.data.comments.forEach((element) => {
                ans.push(element)
            })
            setComments(ans)
        })
        .catch(err => console.log(err))
    },[])

    function submitComment(comment){
        const name = JSON.parse(sessionStorage.getItem("user")).name
        const data ={
            text: comment
        }

        axios.post(`${ServerIP}/content/${contentId}/comment`, data, {
            headers : {
                'Authorization' : `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(res => {
            let Obj = {
                _id:res.data.comment._id,
                comment : comment,
                author:{
                    name: name
                },
            }
            setComments([Obj, ...comments])
        })
        .catch(err => console.log("시이발",err))
    }

    function delComment(_id){
        axios.get(`${ServerIP}/api/comment/${_id}/delete`,{
            headers : {
                'Authorization' : `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(res=>{
            let ans = comments.filter(el=>el._id !== _id)
            setComments(ans)
        })
        .catch(err=> console.log(err))
    }

    return(
        <div id="DetailView" className="footer__height">
            <AboutContent info={{name:"여수"}}/>
            <Review submitMethod={submitComment} 
            commentsInfo={comments} delComment={delComment}/>
        </div>
    )
}

export default DetailView;