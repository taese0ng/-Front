import React from 'react'
import { SearchBar, Banner, HotList} from '../components';
import '../css/Home.scss';

function Home(){
    return (
        <div className="footer__height">
            <Banner></Banner>
            <SearchBar></SearchBar>
            <HotList></HotList>
        </div>
    )
}

export default Home;