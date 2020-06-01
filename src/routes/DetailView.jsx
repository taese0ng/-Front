import React, {Component} from 'react'
import '../css/DetailView.scss'
import AboutContent from '../components/AboutContent.jsx';
import Review from'../components/Review.jsx';

class DetailView extends Component{
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