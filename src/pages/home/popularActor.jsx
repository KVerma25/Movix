import React from 'react'
import useFetch from '../../hooks/useFetch'
import CarouselActor from '../../components/carousel/carouselActor'

function popularActor() {
    const { data, loading } = useFetch(`/person/popular`)
    // console.log('actor', data)

    return (
        <>
            <div className='container'>
                <div className='row mb-3'>
                    <div className='col'>
                        <span className="carouselTitle text-white h4">Popular Actors</span>
                    </div>
                </div>
            </div>
            <CarouselActor data={data?.results} loading={loading} />
        </>
    )
}

export default popularActor