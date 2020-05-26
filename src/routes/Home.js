import React from 'react'
import { SearchBar, Banner, HotList, MyCalendar} from '../components';
import { connect } from "react-redux";
import '../css/Home.scss';

function Home({openCalendar}){
    return (
        <>
            <Banner></Banner>
            <SearchBar></SearchBar>
            {
                openCalendar ? 
                <div id="calendar">
                <MyCalendar/>
                </div>
                : <></>
            }
            <HotList></HotList>
        </>
    )
}

function mapStateToProps(state) {
    return { 
        openCalendar: state.openCalendar,
     };
  }

export default connect(mapStateToProps) (Home);