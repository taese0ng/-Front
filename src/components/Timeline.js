import React, { Component } from "react";
import Place from "./Place"
import '../css/Timeline.scss'
import { connect } from "react-redux";
import axios from 'axios';
import ShowRoute from "./ShowRoute";
import update from 'react-addons-update';
// 타임 라인

class TimeLine extends Component {
   constructor(props){
      super(props);
      this.state = {
         routes : []
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

   render(){
      const {routes} = this.state;
      return (
         <div className="container">
            <ShowRoute/>
            <ul className="timeline">
               {routes.map(route =>(
                  <Place info={route}/>
               ))}
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