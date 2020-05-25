import React from 'react'
import { SearchBar, Banner, HotList} from '../components';

function Home(){
    return (
        <>
            <Banner></Banner>
            <SearchBar></SearchBar>
            <HotList></HotList>
        </>
    )
}

export default Home;