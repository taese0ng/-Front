
import React, {useEffect,useState} from 'react';
import { DatePicker } from '@y0c/react-datepicker';
import '@y0c/react-datepicker/assets/styles/calendar.scss';
import '../css/MyCalendar.scss';
import { connect } from "react-redux";
import { setDate } from "../store/store";
import 'moment/locale/ko';

function MyCalendar({setDate}) {
  const [ToDate, setToDate] = useState("");

  useEffect(()=>{
    const toDay = new Date();
    const productDate = `${toDay.getFullYear()}년 ${toDay.getMonth()}월 ${toDay.getDate()}일`
    setDate(productDate)
    setToDate(`${toDay.getFullYear()}-${toDay.getMonth() < 10 ? "0"+toDay.getMonth() :
     toDay.getMonth()}-${toDay.getDate() < 10 ? "0"+toDay.getDate() : toDay.getDate()}`)
    // eslint-disable-next-line
  },[])

  function onChange(date){
    const data = date.toDate();
    const productDate = `${data.getFullYear()}년 ${data.getMonth()}월 ${data.getDate()}일`;
    setDate(productDate)
  }

  return (
    <DatePicker 
    locale="ko"
    placeholder={ToDate}
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