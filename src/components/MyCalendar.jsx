// import Calendar Component 
import React, { Component } from 'react';
import { DatePicker } from '@y0c/react-datepicker';
// import calendar style 
// You can customize style by copying asset folder.
import '@y0c/react-datepicker/assets/styles/calendar.scss';
import '../css/MyCalendar.scss';
// Please include the locale you want to use.
// and delivery props to calendar component 
// See locale list https://github.com/moment/moment/tree/develop/locale
import 'moment/locale/ko';

class MyCalendar extends Component {
  render() {
    return (
      <DatePicker 
      locale="ko"
      placeholder="날짜 선택"
      />
    )
  }
}

export default MyCalendar;