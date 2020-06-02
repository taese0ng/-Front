import React, {Component} from 'react'
import '../css/DetailView.scss'
import AboutContent from '../components/AboutContent.jsx';
import Review from'../components/Review.jsx';
import axios from 'axios';
import {HopeIP} from '../key'
//192.168.0.21:3000/#/yourSchedule/detailView/
class DetailView extends Component{
    constructor(props){
        super(props)
    }

    componentWillMount(){
        // console.log(this.props.match.params.id)
        const contetntId = this.props.match.params.id;
        axios.get(`${HopeIP}/api/recommend/areadata/${contetntId}`)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err);
        })
    }

    render(){
        return(
            <div id="DetailView">
                <AboutContent info={{name:"여수"}}/>
                <Review/>
            </div>
        )
    }
}

export default DetailView;