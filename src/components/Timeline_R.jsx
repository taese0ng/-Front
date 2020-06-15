import React, { Component } from "react";
import Place from "./Place.jsx"
import '../css/Timeline.scss'
import { connect } from "react-redux";
import axios from 'axios';
import ShowRouteR from "./ShowRoute_R.jsx";
import update from 'react-addons-update';
import {ServerIP, HopeIP} from '../key'
import {setSchedule, initSchedule} from "../store/store";
import { Areas } from '../components/Areas.js'
import Search from './Search.jsx'
import { Link } from "react-router-dom";
import Dialog from "./Dialog.jsx";

class Timeline_R extends Component {
   constructor(props){
      super(props);
      this.state = {
         title: '',
         description : '',
         routes : [],
         bigData : [],
         reviseBtn : false,
         nowScheduleIdx : 0,
         temp : [],
         openSearch:false,
         addIdx : 0,
      }
    }

   UNSAFE_componentWillMount(){
      const {setSchedule,initSchedule, AreaCodes} = this.props
      const userID = JSON.parse(sessionStorage.getItem("user"))._id
      initSchedule();
      AreaCodes.map((AreaCode) => (
         axios.get(`${HopeIP}/api/recommend/user?userId=${userID}&areaCode=${AreaCode.areaCode}&sigunguCode=${AreaCode.sigunguCode}`)
         .then(res => {
            // console.log(res);
            res.data.forEach(schedule=>{
               let routeList = []
               schedule.forEach( element => {
                  let data = element;
                  setSchedule(data.title);
                  routeList.push({
                     contentId : data.contentId,
                     name: data.title,
                     overview : data.overview,
                     image : data.firstImage,
                     homepage : data.homepage,
                     title : data.title,
                     zipCode : data.zipCode,
                     tel : data.tel,
                     lat:data.mapY,
                     lng:data.mapX,
                     description : data.overview
                  })
                  
               });

               this.setState({
                  bigData: update(
                  this.state.bigData,
                  {
                     $push: [routeList]
                  })
               })


            })
            this.setState({
               nowScheduleIdx : 0,
               routes : this.state.bigData[0]
            })
         })
         .catch(err => {
            console.log("츠천에러",err);
         })
      ))
   }

   clickRevise = () => {
      this.setState({
         temp : this.state.routes,
         reviseBtn : !this.state.reviseBtn
      });
   }

   clickUpBtn = (idx) =>{
      if(idx > 0){
         let down = this.state.routes[idx];
         let up = this.state.routes[idx-1];
         this.setState({
            routes : update(
               this.state.routes,
               {
                  [idx] : {$set : up},
                  [idx-1]: {$set: down}
               }
            )
         })
      }
   }

   clickDownBtn = (idx) =>{
      if(idx < this.state.routes.length-1){
         let up = this.state.routes[idx];
         let down = this.state.routes[idx+1];
         this.setState({
            routes : update(
               this.state.routes,
               {
                  [idx] : {$set : down},
                  [idx+1]: {$set: up}
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
         )
      })
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
      
      this.setState({
         bigData: this.state.bigData.slice(0,this.state.nowScheduleIdx).concat([this.state.routes]).concat(this.state.bigData.slice(this.state.nowScheduleIdx+1, this.state.bigData.length))
      })
   }

   nextSchedule = () => {
      if(this.state.nowScheduleIdx < this.state.bigData.length){
         this.setState({
            nowScheduleIdx : this.state.nowScheduleIdx+1,
            routes : this.state.bigData[this.state.nowScheduleIdx+1]
         })
      }
   }

   prevSchedule = () => {
      if(this.state.nowScheduleIdx > 0){
         this.setState({
            nowScheduleIdx : this.state.nowScheduleIdx-1,
            routes : this.state.bigData[this.state.nowScheduleIdx-1]
         })
      }
   }

   modifiCancel = () =>{
      this.setState({
         routes : this.state.temp,
         reviseBtn : !this.state.reviseBtn
      })
   }

   mySchedule = () =>{
      const {AreaCodes, selectDate} = this.props
      let scheduleName = ""
      for(let i=0; i<AreaCodes.length; i++){
         for(let j=0; j<Areas.length; j++){
            if(AreaCodes[i].areaCode === Areas[j].code){
               if(AreaCodes[i].sigunguCode=== 0){
                  scheduleName += Areas[j].name
                  break
               }
               for(let k=0; k<Areas[j].areas.length; k++){
                  if(Areas[j].areas[k].code === AreaCodes[i].sigunguCode){
                     scheduleName += Areas[j].areas[k].name
                     break
                  }
               }
               if(i === AreaCodes.length-1){
                  break;
               }else{
                  scheduleName+=", "
               }
            }
         }
      }

      let contentIds = []
      this.state.routes.forEach(el=>{
         contentIds.push(el.contentId)
      })
      axios.post(`${ServerIP}/itinerary/upload`,{
         areaCodes: AreaCodes,
         date: selectDate,
         title: scheduleName,
         description: this.state.routes.description,
         routes: contentIds
       },{
         headers:{
            'Authorization' : `Bearer ${sessionStorage.getItem('token')}`
         }
      }).then(res=>{
      }).catch(err => console.log(err))
   }

   clickAddBtn = (idx) => {
      this.setState({addIdx : idx})
      const timeline = document.querySelector("body")
      const Search = document.querySelector("#Search")
      if(!this.state.openSearch){
         timeline.style.overflow="hidden";
         Search.style.top = document.documentElement.scrollTop+"px";
      }
      else{
         timeline.style.overflow="unset";
      }
      this.setState({
         openSearch : !this.state.openSearch
      })
   }

   addSchedule = (info) =>{
      // console.log(info)
      const obj = {
         contentId : info.contentId,
         name: info.title,
         overview : info.overview,
         image : info.firstImage,
         homepage : info.homepage,
         title : info.title,
         zipCode : info.zipCode,
         tel : info.tel,
         lat:info.mapY,
         lng:info.mapX,
         description : info.overview
      }
      
      this.setState({
         routes: this.state.routes.slice(0,this.state.addIdx).concat(obj).concat(this.state.routes.slice(this.state.addIdx,this.state.routes.length))
      })
   }

   render(){
      return (
         <div className="container">
            <ShowRouteR recommend={this.state.routes}/>
            <Search clickAddBtn={this.clickAddBtn} addSchedule={this.addSchedule} className={!this.state.openSearch ? "notVisible" : ""}/>
             {/* 일정체택 버튼 */}
             <Dialog onClickOk = {this.mySchedule} comment = "내 일정으로 채택하시겠습니까?"/> 
            <ul className="timeline">
               {
                  this.state.routes.map((route,index) => (
                     <li key={index} className="route">
                        {
                           this.state.reviseBtn &&
                           <div>
                              <button className="smallBtn" onClick={() => this.clickUpBtn(index)}>Up</button>
                              <button className="smallBtn" onClick={() => this.clickDownBtn(index)}>Down</button>
                              <button className="smallBtn" onClick={() => this.clickDelBtn(index)}>Delete</button>
                              <button className="smallBtn" onClick={() => this.clickAddBtn(index)}>Add</button>
                           </div>
                        }
                        <Place info={route} index={index} mapState={!this.state.reviseBtn}/>
                     </li>
                  ))
               }
            </ul>
            <div>
               {((this.state.nowScheduleIdx !== 0 ) && (!this.state.reviseBtn)) &&
                  <span>
                     <button className="middleBtn borderBtn" onClick={this.prevSchedule}>이전 추천</button>
                  </span>
               }
               <span id="ReviseSchedule">
                  {!this.state.reviseBtn ?
                  <button className="middleBtn borderBtn scheduleBtn" onClick={this.clickRevise}>일정 수정</button> :
                  <button className="middleBtn borderBtn scheduleBtn" onClick={this.clickUpdateBtn}>수정 완료</button>
                  }
               </span>
               <span>
                  {!this.state.reviseBtn ?
                     // <Link to='/yourSchedule'><button className="middleBtn borderBtn scheduleBtn" onClick={this.mySchedule}>일정 채택</button></Link>:
                     <button className="middleBtn borderBtn scheduleBtn">일정 채택</button>:
                     <button className="middleBtn borderBtn scheduleBtn" onClick={this.modifiCancel}>수정 취소</button>
                  }
               </span>
               {((this.state.nowScheduleIdx !== this.state.bigData.length-1) && (!this.state.reviseBtn)) &&
                  <span>
                     <button className="middleBtn borderBtn" onClick={this.nextSchedule}>다음 추천</button>
                  </span>
               }
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
      selectDate: state.selectDate,
    };
 }

 function mapDispatchToProps(dispatch) {
   return { 
      setSchedule: (text) => dispatch(setSchedule(text)),
      initSchedule: () => dispatch(initSchedule()),
   };
 }

export default connect(mapStateToProps,mapDispatchToProps) (Timeline_R);