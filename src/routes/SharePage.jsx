import React, {useState, useEffect} from "react";
import {Card} from '../components'
import axios from 'axios'
import '../css/Card.scss'
import {ServerIP} from '../key'

function SharePage(){
  const [cards, setCards] = useState([])

  useEffect(() => {
    axios.get(`${ServerIP}/itinerary`)
    .then((res)=>{
      console.log(res)
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
            // cardImg={card.cardImg}
            cardImg="https://www.mcst.go.kr/attachFiles/cultureInfoCourt/localFestival/notifyFestival/1523839838562.jpg"
            schedule={card.title}
            view={card.view}
            date={card.routes[0].Date}
          />
        ))}
        
      </ul>
    </div>
  );

}


export default SharePage;
