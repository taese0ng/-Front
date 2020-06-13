
import React from 'react';
import { DatePicker } from '@y0c/react-datepicker';
import '@y0c/react-datepicker/assets/styles/calendar.scss';
import '../css/MyCalendar.scss';
import { connect } from "react-redux";
import { setDate } from "../store/store";

import 'moment/locale/ko';

function MyCalendar({setDate}) {

  function onChange(date){
    const data = date.toDate();
    const productDate = `${data.getFullYear()}년 ${data.getMonth()}월 ${data.getDate()}일`;
    setDate(productDate)
  }

  return (
    <DatePicker 
    locale="ko"
    placeholder="날짜 선택"
    onChange={onChange}
    />
  )
}

function mapStateToProps(state) {
  return { 

   };
}

function mapDispatchToProps(dispatch) {
  return { 
     setDate: (date) => dispatch(setDate(date)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps) (MyCalendar);