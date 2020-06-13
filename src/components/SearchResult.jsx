import React from 'react';

//const HopeIP = "http://202.31.202.252:80"

function SearchResult(props) {
    return (
        <ul className="search__data">
        <li className="search__Img_box">
            <img className="search__Img" src={props.info.firstImage} alt={props.info.name}/>
        </li>

        <li className="search__description__box">
            <p className="search__name">{props.info.title}</p>
        </li>
    </ul>
    );
}

export default SearchResult;