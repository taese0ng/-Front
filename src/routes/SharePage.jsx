import React, {useState, useEffect} from "react";
import {Card} from '../components'
import { useHistory } from "react-router-dom";
import axios from 'axios'
import '../css/Card.scss'
import {ServerIP} from '../key'
import { connect } from "react-redux";
import { setItineraryId, setPage } from "../store/store";

function SharePage({setItineraryId, setPage}){
  const history = useHistory();
  const [cards, setCards] = useState([])

  useEffect(() => {
    axios.get(`${ServerIP}/itinerary`)
    .then((res)=>{
      // console.log(res)
      let items=[]
      res.data.items.forEach(el=>{
        items.push(el)
      })
      setCards(items)
    })
    .catch(err => console.log(err))
  },[])

  return (
    <div id="CardView" className="footer__height">
      <ul>
        {cards.map((card, index) => (
          <Card
            key={index}
            name={card.creator.name}
            cardImg={card.img}
            // cardImg="https://www.mcst.go.kr/attachFiles/cultureInfoCourt/localFestival/notifyFestival/1523839838562.jpg"
            schedule={card.title}
            view={card.view}
            date={card.date}
            method={
              () => {
                setItineraryId(card._id);
                setPage('sharePage');
                history.push(`/yourSchedule/schedule/${card._id}`);
              }}
          />
        ))}
        
      </ul>
    </div>
  );

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

export default connect(mapStateToProps, mapDispatchToProps) (SharePage);
