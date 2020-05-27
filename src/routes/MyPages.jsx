import React, { Component } from "react";
import '../css/MyPage.scss'
import axios from 'axios';
import { connect } from "react-redux";
import { setItineraryId } from "../store/store";
import update from 'react-addons-update';

class MyPages extends Component {
  constructor(props){
    super(props);
    this.state = {
      itineraryList: []
    }
  }

  async UNSAFE_componentWillMount(){
    const id = JSON.parse(localStorage.getItem('user'))._id;
    await axios.get(`http://49.50.175.145:3389/user/${id}`)
    .then(res=>{
      res.data.itinerary.forEach(element => {
        this.setState({
          itineraryList: update(
            this.state.itineraryList,
            {
              $push: [element]
            }
          )
        })
      });
    })
    .catch(err=>{
      console.log(err);
    })
  }

  render(){
    const {setItineraryId} = this.props;
    const {itineraryList} = this.state;
    console.log(itineraryList)
    return (
      <div className="mypages">
        {itineraryList.map((element) => (
          <MyPage 
          Location={element.title} Period={element.routes[0].Date} 
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
      <div className="page" onClick={method} >
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
