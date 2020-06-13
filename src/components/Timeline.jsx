import React, { Component } from "react";
import Place from "./Place.jsx"
import '../css/Timeline.scss'
import { connect } from "react-redux";
import axios from 'axios';
import ShowRouteR from "./ShowRoute_R.jsx";
import update from 'react-addons-update';
import { Link } from "react-router-dom";
import {ServerIP} from '../key'
import {setSchedule, initSchedule} from "../store/store";

class TimeLine extends Component {
   constructor(props){
      super(props);
      this.state = {
         title: '',
         description : '',
         routes : [],
         reviseBtn : false,
         publish: false,
         recommend : []
      }
    }

   UNSAFE_componentWillMount(){
      const {itineraryId,setSchedule,initSchedule} = this.props
      initSchedule();
      
      axios.get(`${ServerIP}/itinerary/${itineraryId}`)
      .then(res => {
         // console.log("ㅇㅇㅇ",res)
         res.data.routes.forEach(element => {
            setSchedule(element.title); //todo 지울지말지 결정.
            this.setState({
               routes: update(
                  this.state.routes,
                  {
                     $push: [
                        {
                           name: element.title,
                           overview : element.overview,
                           image : element.firstImage,
                           homepage : element.homepage,
                           title : element.title,
                           zipCode : element.zipCode,
                           tel : element.tel,
                        }
                     ]
                  }
               )
               })
               this.setState({
               recommend: update(
                  this.state.recommend,
                  {
                     $push:[{lat:element.mapY,lng:element.mapX}]
                  }
               )
               })
         });
         this.setState({
            title: res.data.itinerary.title,
            description : res.data.itinerary.description,
            publish: res.data.itinerary.publish
         })
      })
      .catch(err => {
         console.log(err);
      })
   }

   clickRevise = () => {
      this.setState({
         reviseBtn : !this.state.reviseBtn
      });
   }

   clickUpBtn = (idx) =>{
      if(idx > 0){
         let down = this.state.routes[idx];
         let up = this.state.routes[idx-1];
         let downXY = this.state.recommend[idx];
         let upXY = this.state.recommend[idx-1];
         this.setState({
            routes : update(
               this.state.routes,
               {
                  [idx] : {$set : up},
                  [idx-1]: {$set: down}
               }
            )
         })
         this.setState({
            recommend : update(
               this.state.recommend,
               {  
                  [idx] : {$set : upXY},
                  [idx-1]: {$set: downXY}
               }
            )
         })
      }
   }

   clickDownBtn = (idx) =>{
      if(idx < this.state.routes.length-1){
         let up = this.state.routes[idx];
         let down = this.state.routes[idx+1];
         let upXY = this.state.recommend[idx];
         let downXY = this.state.recommend[idx+1];
         this.setState({
            routes : update(
               this.state.routes,
               {
                  [idx] : {$set : down},
                  [idx+1]: {$set: up}
               }
            ),
            recommend : update(
               this.state.recommend,
               {
                  [idx] : {$set : downXY},
                  [idx+1]: {$set: upXY}
               }
            )
         })
      }
   }


   clickDelBtn = (idx) => {
      this.setState({
         routes : update(
            this.state.routes,
            {
               $splice: [[idx,1]]
            }
         ),
         recommend : update(
            this.state.recommend,
            {
               $splice: [[idx,1]]
            }
         )
      })
   }

   clickDelSchedule = () =>{
      const {itineraryId} = this.props
      // console.log("Delete Schedule");
      axios.get(`${ServerIP}/itinerary/${itineraryId}/delete`,
         {
            headers:{
               'Authorization' : `Bearer ${sessionStorage.getItem('token')}` // 꼭 'Bearer ' 붙여줘야함
            }
      }).then(res => {
         console.log(res,"삭제")
      }).catch(err => console.log(err))
   }

   clickUpdateBtn = () => {
      const {itineraryId,setSchedule,initSchedule} = this.props
      // console.log("Update");
      axios.post(`${ServerIP}/itinerary/${itineraryId}/edit`,
      {
         title : this.state.title,
         description : this.state.description,
         routes:this.state.routes
      },
      {
         headers:{
            'Authorization' : `Bearer ${sessionStorage.getItem('token')}` // 꼭 'Bearer ' 붙여줘야함
         }
     }).then(res => {
         // console.log(res,"이거야")
         // 일정 수정 시 업데이트
         initSchedule();
         this.state.routes.forEach(element => {
            setSchedule(element.name);
         })
         // console.log("음",schedule);
      }).catch(err => console.log(err))

      this.setState({
         reviseBtn : !this.state.reviseBtn
      });
   }

   setPublic=()=>{
      const {itineraryId} = this.props
      axios.get(`${ServerIP}/itinerary/${itineraryId}/public`, {
         headers:{'Authorization' : `Bearer ${sessionStorage.getItem('token')}`}
      })
      .then(res => {
         // console.log(res)
         this.setState({publish: true})
      })
      .catch(err => console.log(err))
   }

   setPrivate=()=>{
      const {itineraryId} = this.props
      axios.get(`${ServerIP}/itinerary/${itineraryId}/private`, {
         headers:{'Authorization' : `Bearer ${sessionStorage.getItem('token')}`}
      })
      .then(res => {
         // console.log(res)
         this.setState({publish: false})
      })
      .catch(err => console.log(err))
   }
   

   render(){
      const {isPage} = this.props;

      return (
         <div className="container">
            <ShowRouteR recommend={this.state.recommend}/>
            <ul className="timeline">
               {
                  this.state.routes.map((route,index) => (
                     <li key={index} className="route">
                        {
                           this.state.reviseBtn ? 
                           <div>
                              <button className="smallBtn" onClick={() => this.clickUpBtn(index)}>Up</button>
                              <button className="smallBtn" onClick={() => this.clickDownBtn(index)}>Down</button>
                              <button className="smallBtn" onClick={() => this.clickDelBtn(index)}>Delete</button>
                           </div> : 
                           <></>
                        }
                        <Place info={route} index={index}/>
                     </li>
                  ))
               }
            </ul>
            { isPage==="sharePage" ? 
               <div>
                  <button className="middleBtn addBtn">내 일정에 추가하기</button>
               </div>
               :
               <div>
                  <span id="ReviseSchedule">
                     {!this.state.reviseBtn ?
                     <button className="middleBtn borderBtn" onClick={this.clickRevise}>일정 수정</button> :
                     <button className="middleBtn borderBtn" onClick={this.clickUpdateBtn}>수정 완료</button>
                     }
                  </span>
                  <span>
                     <Link to="/yourSchedule">
                        <button className="middleBtn borderBtn" onClick = {this.clickDelSchedule}>일정 삭제</button>
                     </Link>
                  </span>
                  <span>
                     {this.state.publish ?
                        <button className="middleBtn borderBtn" onClick={this.setPrivate}>공유해제</button> :
                        <button className="middleBtn borderBtn" onClick={this.setPublic}>공유하기</button>
                     }
                  </span>
               </div>
            }
         </div>
      );
   }
}

function mapStateToProps(state) {
   return { 
      itineraryId : state.itineraryId,
      schedule : state.schedule,
      isPage : state.isPage,
    };
 }

 function mapDispatchToProps(dispatch) {
   return { 
      setSchedule: (text) => dispatch(setSchedule(text)),
      initSchedule: () => dispatch(initSchedule())
   };
 }

export default connect(mapStateToProps,mapDispatchToProps) (TimeLine);