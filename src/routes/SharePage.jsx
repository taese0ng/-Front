import React, {Component} from "react";
import {Card} from '../components'
import '../css/Card.scss'

class SharePage extends Component{
  constructor(props){
    super(props);
    this.state = {
      cards :[
        {
          eMail:"taese0ng@naver.com",
          cardImg:"https://www.mcst.go.kr/attachFiles/cultureInfoCourt/localFestival/notifyFestival/1523839838562.jpg",
          schedule: '부산 여행',
          view: '82,892',
          date: '5월 2일'
        },
        {
          eMail:"taese0ng@naver.com",
          cardImg:"https://www.mcst.go.kr/attachFiles/cultureInfoCourt/localFestival/notifyFestival/1523839838562.jpg",
          schedule: '부산 여행',
          view: '82,892',
          date: '5월 2일'
        },
        {
          eMail:"taese0ng@naver.com",
          cardImg:"https://www.mcst.go.kr/attachFiles/cultureInfoCourt/localFestival/notifyFestival/1523839838562.jpg",
          schedule: '부산 여행',
          view: '82,892',
          date: '5월 2일'
        },
        {
          eMail:"taese0ng@naver.com",
          cardImg:"https://www.mcst.go.kr/attachFiles/cultureInfoCourt/localFestival/notifyFestival/1523839838562.jpg",
          schedule: '부산 여행',
          view: '82,892',
          date: '5월 2일'
        }
      ]
    }
  }

  render(){
    const {cards} = this.state;
    return (
      <div id="CardView" className="footer__height">
        <ul>
          {cards.map((card, index) => (
            <Card
              key={index}
              eMail={card.eMail}
              cardImg={card.cardImg}
              schedule={card.schedule}
              view={card.view}
              date={card.date}
            />
          ))}
          
        </ul>
      </div>
    );
  }
}


export default SharePage;
