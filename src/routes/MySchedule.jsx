import React, { Component } from "react";
import axios from 'axios';
import { connect } from "react-redux";
import { setItineraryId, setPage } from "../store/store";
import update from 'react-addons-update';
import { ServerIP } from '../key'
import { Card } from '../components'

class MyPages extends Component {
  constructor(props){
    super(props);
    this.state = {
      itineraryList: [],
      userName: "",
    }
  }

  UNSAFE_componentWillMount(){
    const id = JSON.parse(sessionStorage.getItem('user'))._id;
    axios.get(`${ServerIP}/user/${id}`)
    .then(res=>{
      console.log("dd",res)
      this.setState({
        userName: res.data.user.name
      });
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
    const {setItineraryId, setPage} = this.props;
    const {itineraryList, userName} = this.state;
    return (
      <div id="CardView" className="footer__height">
        <ul>
          {itineraryList.map((element) => (
            <Card
            key={element._id}
            name={userName}
            cardImg={element.img}
            schedule={element.title}
            date={element.date}
            method={
              () => {
                setItineraryId(element._id);
                setPage("mySchedule");
                this.props.history.push(`/yourSchedule/schedule/${element._id}`);
              }}
              />
          ))}
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
    setPage: (pageName) => dispatch(setPage(pageName)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (MyPages);
