import React, { Component } from "react";
import Place from "./Place"
import '../css/Timeline.scss'
import { connect } from "react-redux";
import axios from 'axios';
import ShowRoute from "./ShowRoute";

// 타임 라인

let routes = []

class TimeLine extends Component {
   UNSAFE_componentWillMount(){
      const {itineraryId} = this.props
      axios.get(`http://49.50.175.145:3389/itinerary/${itineraryId}`)
      .then(res => {
         routes = [];
         res.data.itinerary.routes.forEach(element => {
            routes.push(element)
         });
         console.log(routes);
      })
      .catch(err => {
         console.log(err);
      })
   }

   render(){
      return (
         <div className="container">
            <ShowRoute/>
            <ul className="timeline">
               {routes.map(element =>(
                  <Place />
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