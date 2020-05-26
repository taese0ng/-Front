import React, { Component } from "react";
import '../css/MyPage.scss'
import axios from 'axios';
import { connect } from "react-redux";
import { setItineraryId } from "../store/store";

let itineraryList = [];

class MyPages extends Component {
  UNSAFE_componentWillMount(){
    const id = JSON.parse(localStorage.getItem('user'))._id;
    axios.get(`http://49.50.175.145:3389/user/${id}`)
    .then(res=>{
      // console.log(res);
      itineraryList = [];
      res.data.itinerary.forEach(element => {
        itineraryList.push(element);
      });
      console.log(itineraryList)
      // setItinerayList('')
    })
    .catch(err=>{
      console.log(err);
    })
  }

  render(){
    const {setItineraryId} = this.props;

    return (
      <div className="mypages">
        {itineraryList.map((element) => (
          <MyPage 
          Location={element.title} Period="1월1일" 
          Id={element._id} key={element._id} 
          method={
            () => {
              setItineraryId(element._id)
              this.props.history.push(`/yourSchedule/schedule/${element._id}`);
            }
          }/>
        ))}
      </div>
    );
  }
}

class MyPage extends Component {

  render(){
    const {Location, Period, method} = this.props;
    return (
      <div className="page" onClick={method}>
        <ul>
          <li>{Period}</li>
          <li>{Location}</li>
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    
   };
}

function mapDispatchToProps(dispatch) {
  return { 
    setItineraryId: (text) => dispatch(setItineraryId(text)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (MyPages);
