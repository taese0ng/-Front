import React, { Component } from "react";
import Place from "./Place.jsx"
import '../css/Timeline.scss'
import { connect } from "react-redux";
import axios from 'axios';
import ShowRoute from "./ShowRoute.jsx";
import update from 'react-addons-update';
// 타임 라인

class TimeLine extends Component {
   constructor(props){
      super(props);
      this.state = {
         routes : [],
         reviseBtn : false,
      }
    }

   UNSAFE_componentWillMount(){
      const {itineraryId} = this.props
      axios.get(`http://49.50.175.145:3389/itinerary/${itineraryId}`)
      .then(res => {
         res.data.itinerary.routes.forEach(element => {
            this.setState({
               routes: update(
                 this.state.routes,
                 {
                   $push: [element]
                 }
               )
             })
         });
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
      console.log("Up", idx)
   }

   clickDownBtn = (idx) =>{
      console.log("Down", idx)
   }

   render(){
      return (
         <div className="container">
            <ShowRoute/>
            <div id="ReviseSchedule">
               <button onClick={this.clickRevise}>일정 수정</button>
            </div>
            <ul className="timeline">
               {
                  this.state.routes.map((route,index) => (
                     <li key={index}>
                        {
                           this.state.reviseBtn ? 
                           <div>
                              <button onClick={() => this.clickUpBtn(index)}>Up</button>
                              <button onClick={() => this.clickDownBtn(index)}>Down</button>
                           </div> : 
                           <></>
                        }
                        <Place info={route}/>
                     </li>
                  ))
               }
            </ul>
         </div>

      );
   }
}

function mapStateToProps(state) {
   return { 
      itineraryId : state.itineraryId,
    };
 }

export default connect(mapStateToProps) (TimeLine);