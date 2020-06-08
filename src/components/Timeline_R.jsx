import React, { Component } from "react";
import Place from "./Place.jsx"
import '../css/Timeline.scss'
import { connect } from "react-redux";
import axios from 'axios';
import ShowRoute from "./ShowRoute.jsx";
import update from 'react-addons-update';
import { Link } from "react-router-dom";
import {ServerIP, HopeIP} from '../key'
import {setSchedule, initSchedule,setLatlng,initLatlng} from "../store/store";

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
      const {setLatlng,initLatlng,setSchedule,initSchedule} = this.props
      initSchedule();
      initLatlng();
      axios.get(`${HopeIP}/api/recommend/user?userId=jn8121@naver.com&areaCode=32&sigunguCode=1`)
      .then(res => {
         console.log("추추추");
         console.log("츠천",res);
         console.log("경로정보", res.data[0].detail);
         res.data[0].area.forEach( element => {
            //console.log("경로 데이터", res.data[0].detail[element]);
            let data = res.data[0].detail[element];
            setSchedule(data.title);
            setLatlng({lat:data.mapY,lng: data.mapX});
            this.setState({
               routes: update(
                 this.state.routes,
                 {
                   $push: [{name : data.title}]
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
      // axios.get(`${ServerIP}/itinerary/${itineraryId}`)
      // .then(res => {
      //    console.log(res)
      //    res.data.itinerary.routes.forEach(element => {
      //       setSchedule(element.name);
      //       this.setState({
      //          routes: update(
      //            this.state.routes,
      //            {
      //              $push: [element]
      //            }
      //          )
      //        })
      //    });
      //    this.setState({
      //       title: res.data.itinerary.title,
      //       description : res.data.itinerary.description,
      //    })
      // })
      // .catch(err => {
      //    console.log(err);
      // })
   }

   clickRevise = () => {
      this.setState({
         reviseBtn : !this.state.reviseBtn
      });
   }

   clickUpBtn = (idx) =>{
      console.log("Up", idx)
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
      console.log("Down", idx)
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
      console.log("Del", idx);
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
      const {itineraryId} = this.props
      console.log("Delete Schedule");
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
      const {itineraryId,schedule,setSchedule,initSchedule} = this.props
      console.log("Update");
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
         console.log(res,"이거야")
         // 일정 수정 시 업데이트
         initSchedule();
         this.state.routes.forEach(element => {
            setSchedule(element.name);
         })
         console.log("음",schedule);
      }).catch(err => console.log(err))

      this.setState({
         reviseBtn : !this.state.reviseBtn
      });
   }

   render(){
      return (
         <div className="container">
            <ShowRoute/>
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
      schedule:state.schedule
    };
 }

 function mapDispatchToProps(dispatch) {
   return { 
      setSchedule: (text) => dispatch(setSchedule(text)),
      initSchedule: () => dispatch(initSchedule()),
      setLatlng: (text) => dispatch(setLatlng(text)),
      initLatlng: () => dispatch(initLatlng())
   };
 }

export default connect(mapStateToProps,mapDispatchToProps) (Timeline_R);