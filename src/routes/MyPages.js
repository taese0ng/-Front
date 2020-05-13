import React from "react";
import '../css/MyPage.scss'

function MyPages() {
  return (
    <>
      <div className="mypages">
        <MyPage Location="전주" Period="1월1일"></MyPage>
        <MyPage Location="여수" Period="2월2일"></MyPage>
        <MyPage Location="서울" Period="3월3일"></MyPage>
        <MyPage Location="대구" Period="4월4일"></MyPage>
        <MyPage Location="부산" Period="5월5일"></MyPage>
      </div>
    </>
  );
}

function MyPage(props) {
  const { Location, Period } = props;
  return (
    <div className="page">
      <ul>
        <li>{Period}</li>
        <li>{Location}</li>
      </ul>
    </div>
  );
}

export default MyPages;
