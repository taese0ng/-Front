import React, { Component } from "react";
import Place from "./Place.jsx"
import '../css/Timeline.scss'
import { connect } from "react-redux";
import axios from 'axios';
import ShowRoute_R from "./ShowRoute_R.jsx";
import update from 'react-addons-update';
import { Link } from "react-router-dom";
import {ServerIP, HopeIP} from '../key'
import {setSchedule, initSchedule} from "../store/store";

class Timeline_R extends Component {
   constructor(props){
      super(props);
      this.state = {
         title: '',
         description : '',
         routes : [],
         reviseBtn : false,
         recommend : []
      }
    }

   UNSAFE_componentWillMount(){
      const {setSchedule,initSchedule, AreaCodes} = this.props
      const userID = JSON.parse(sessionStorage.getItem("user"))._id
      initSchedule();
      AreaCodes.map((AreaCode) => (
         axios.get(`${HopeIP}/api/recommend/user?userId=${userID}&areaCode=${AreaCode.areaCode}&sigunguCode=${AreaCode.sigunguCode}`)
         .then(res => {
            res.data[0].area.forEach( element => {
               console.log(res.data[0].detail);
               let data = res.data[0].detail[element];
               setSchedule(data.title);
               
               this.setState({
                  routes: update(
                  this.state.routes,
                  {
                     $push: [{
                        name: data.title,
                        overview : data.overview,
                        image : data.firstImage,
                        homepage : data.homepage,
                        title : data.title,
                     }]
                  }
                  )
               })
               this.setState({
                  recommend: update(
                  this.state.recommend,
                  {
                     $push:[{lat:data.mapY,lng:data.mapX}]
                  }
                  )
               })
               this.setState({
                  title: data.title,
                  description : data.overview
               })
            });
         })
         .catch(err => {
            console.log("츠천에러",err);
         })
      ))
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
      const {setSchedule,initSchedule} = this.props;
     
         // 일정 수정 시 업데이트
         initSchedule();
         this.state.routes.forEach(element => {
            setSchedule(element.name);
         })

      this.setState({
         reviseBtn : !this.state.reviseBtn
      });
      
   }
   render(){
      return (
         <div className="container">
            <ShowRoute_R recommend={this.state.recommend}/>
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
            <div>
               <span id="ReviseSchedule">
                  {!this.state.reviseBtn ?
                  <button className="middleBtn" onClick={this.clickRevise}>일정 수정</button> :
                  <button className="middleBtn" onClick={this.clickUpdateBtn}>수정 완료</button>
                  }
               </span>
               <span>
                  <Link to="/yourSchedule">
                     <button className="middleBtn" onClick = {this.clickDelSchedule}>일정 삭제</button>
                  </Link>
               </span>
            </div>
         </div>
      );
   }
}

function mapStateToProps(state) {
   return { 
      itineraryId : state.itineraryId,
      schedule:state.schedule,
      AreaCodes: state.AreaCodes,
    };
 }

 function mapDispatchToProps(dispatch) {
   return { 
      setSchedule: (text) => dispatch(setSchedule(text)),
      initSchedule: () => dispatch(initSchedule()),
   };
 }

export default connect(mapStateToProps,mapDispatchToProps) (Timeline_R);