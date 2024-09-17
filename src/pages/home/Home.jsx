import React from 'react'
import HeroBanner from './HeroBanner'
import Trending from './Trending'
import Popular from './Popular'
import Upcoming from './Upcoming'
import TopRated from './topRated'
import PopularActor from './popularActor'

function Home() {
    return (
        <>
            <HeroBanner />
            <Trending />
            <TopRated />
            <Popular />
            <Upcoming />
            <PopularActor />
        </>
    )
}


export default Home