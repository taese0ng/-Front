import React from 'react'
import "../css/About.scss";

function AboutContent(props){
    
    function createMarkup(element){
        return {__html: element};
    }

    return(
        <ul className="about__data">
            <li className="about__Img_box">
                <img className="about__Img" src={props.info.image} alt={props.info.name}/>
            </li>

            <li className="about__description__box">
                <p className="about__name">{props.info.name}</p>
                <p className="about__description" dangerouslySetInnerHTML={createMarkup(props.info.overview)}></p>
            </li>
        </ul>
    )
}

export default AboutContent;