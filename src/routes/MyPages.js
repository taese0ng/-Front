import React from "react";
import { useHistory } from "react-router-dom";
import '../css/MyPage.scss'

function MyPages() {
  return (
    <>
      <div className="mypages">
        <MyPage Location="전주" Period="1월1일" Schedule="/yourSchedule/schedule"/>
        <MyPage Location="여수" Period="2월2일" Schedule="/yourSchedule/schedule"/>
        <MyPage Location="서울" Period="3월3일" Schedule="/yourSchedule/schedule"/>
        <MyPage Location="대구" Period="4월4일" Schedule="/yourSchedule/schedule"/>
        <MyPage Location="부산" Period="5월5일" Schedule="/yourSchedule/schedule"/>
      </div>
    </>
  );
}

function MyPage(props) {
  const { Location, Period, Schedule } = props;
  const history = useHistory();

  return (
    <div className="page" onClick={
      () => {
        history.push(Schedule);
      }
    }>
      <ul>
        <li>{Period}</li>
        <li>{Location}</li>
      </ul>
    </div>
  );
}

export default MyPages;
