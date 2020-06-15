import React, { Component } from "react";
import Place from "./Place.jsx"
import '../css/Timeline.scss'
import { connect } from "react-redux";
import axios from 'axios';
import ShowRouteR from "./ShowRoute_R.jsx";
import update from 'react-addons-update';
import {ServerIP} from '../key'
import {setSchedule, initSchedule, setAreaCodes} from "../store/store";
import Search from './Search.jsx'
import Dialog from "./Dialog.jsx";

class TimeLine extends Component {
   constructor(props){
      super(props);
      this.state = {
         title: '',
         description : '',
         routes : [],
         reviseBtn : false,
         publish: false,
         openSearch:false,
         sureDelete:false,
         addIdx : 0,
         areaCodes: [],
         date: "",
         temp: [],
         openDialog : false,
         dialogComment: "",
         dialogMethod: null,
      }
    }

   UNSAFE_componentWillMount(){
      const {itineraryId,setSchedule,initSchedule,setAreaCodes} = this.props
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
                           lat:element.mapY,
                           lng:element.mapX,
                           contentId:element.contentId
                        }
                     ]
                  }
               )
               })
         });
         this.setState({
            date: res.data.itinerary.date,
            areaCodes: res.data.itinerary.areaCodes,
            title: res.data.itinerary.title,
            description : res.data.itinerary.description,
            publish: res.data.itinerary.publish
         })
         setAreaCodes(res.data.itinerary.areaCodes)
      })
      .catch(err => {
         console.log(err);
      })
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
            ),
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

   clickDelSchedule = () =>{
      const {itineraryId} = this.props;
      axios.get(`${ServerIP}/itinerary/${itineraryId}/delete`,
         {
            headers:{
               'Authorization' : `Bearer ${sessionStorage.getItem('token')}` // 꼭 'Bearer ' 붙여줘야함
            }
      }).then(res => {
         // console.log(res,"삭제")
      }).catch(err => console.log(err))
   }

   clickUpdateBtn = () => {
      const {itineraryId,setSchedule,initSchedule} = this.props
      // console.log("Update");
      let contentIds = []
      this.state.routes.forEach(el=>{
         contentIds.push(el.contentId)
      })
      axios.post(`${ServerIP}/itinerary/${itineraryId}/edit`,
      {
         date: this.state.date,
         title : this.state.title,
         description : this.state.description,
         routes: contentIds
      },
      {
         headers:{
            'Authorization' : `Bearer ${sessionStorage.getItem('token')}` // 꼭 'Bearer ' 붙여줘야함
         }
     }).then(res => {}).catch(err => console.log(err))
      initSchedule();
      this.state.routes.forEach(element => {
         setSchedule(element.name);
      })
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

   modifiCancel = () =>{
      this.setState({
         routes : this.state.temp,
         reviseBtn : !this.state.reviseBtn
      })
   }

   getOtherSchedule = () =>{
      let contentIds = []
      this.state.routes.forEach(el=>{
         contentIds.push(el.contentId)
      })
      axios.post(`${ServerIP}/itinerary/upload`,{
         areaCodes: this.state.areaCodes,
         date: this.state.date,
         title: this.state.title,
         description: this.state.routes.description,
         routes: contentIds
       },{
         headers:{
            'Authorization' : `Bearer ${sessionStorage.getItem('token')}`
         }
      }).then(res=>{}).catch(err => console.log(err))
   }


   setDialog = () =>{
      const timeline = document.querySelector("body")
      const dialog = document.querySelector("#Dialog")
      if(!this.state.openDialog){
         timeline.style.overflow="hidden";
         dialog.style.top = document.documentElement.scrollTop+"px";
      }
      else{
         timeline.style.overflow="unset";
      }
      this.setState({
         openDialog : !this.state.openDialog
      })
   }

   setDialogProps =(onMethod, onComment)=>{
      this.setState({
         dialogMethod : onMethod,
         dialogComment : onComment
      })
      this.setDialog();
   }

   render(){
      const {isPage} = this.props;

      return (
         <div className="container">
            <ShowRouteR recommend={this.state.routes}/>
            <Search clickAddBtn={this.clickAddBtn} addSchedule={this.addSchedule} className={!this.state.openSearch ? "notVisible" : ""}/>
            <Dialog onClickOk = {this.state.dialogMethod} onCancel={this.setDialog} className={!this.state.openDialog ? "notVisible" : ""} comment = {this.state.dialogComment}/> 
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
                              <button className="smallBtn" onClick={() => this.clickAddBtn(index)}>Add</button>
                           </div> : 
                           <></>
                        }
                        <Place info={route} index={index} mapState={!this.state.reviseBtn}/>
                     </li>
                  ))
               }
            </ul>
            { isPage==="sharePage" ? 
               <div>
                  <button className="middleBtn addBtn scheduleBtn" onClick={() => this.setDialogProps(this.getOtherSchedule, "현재 보고계신 일정을 내 일정으로 추가하시겠습니까?")}>내 일정에 추가하기</button>

               </div>
               :
               <div>
                  <span id="ReviseSchedule">
                     {!this.state.reviseBtn ?
                     <button className="middleBtn borderBtn scheduleBtn" onClick={this.clickRevise}>일정 수정</button> :
                     <>
                        <button className="middleBtn borderBtn scheduleBtn" onClick={this.clickUpdateBtn}>수정 완료</button>
                        <button className="middleBtn borderBtn scheduleBtn" onClick={this.modifiCancel}>수정 취소</button>
                     </>
                     }
                  </span>
                  <span>
                     <button className="middleBtn borderBtn scheduleBtn" onClick={() => this.setDialogProps(this.clickDelSchedule, "정말 삭제하시겠습니까?")}>일정 삭제</button>

                  </span>
                  <span>
                     {this.state.publish ?
                        <button className="middleBtn borderBtn notShare" onClick={() => this.setDialogProps(this.setPrivate, "정말 이 일정의 공유를 해제하시겠습니까?")}>공유해제</button> :
                        <button className="middleBtn borderBtn scheduleBtn" onClick={() => this.setDialogProps(this.setPublic, "정말 이 일정을 공유 하시겠습니까?")}>공유하기</button>
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
      selectDate : state.selectDate,
    };
 }

 function mapDispatchToProps(dispatch) {
   return { 
      setSchedule: (text) => dispatch(setSchedule(text)),
      initSchedule: () => dispatch(initSchedule()),
      setAreaCodes: (AreaCodes) => dispatch(setAreaCodes(AreaCodes))
   };
 }

export default connect(mapStateToProps,mapDispatchToProps) (TimeLine);