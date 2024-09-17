import React, { useState } from 'react'
import SwitchTabs from '../../components/switchTabs/switchTabs'
import useFetch from '../../hooks/useFetch'
import Carousel from '../../components/carousel/carousel'

function Popular() {
    const [endPoint, setEndPoint] = useState("movie")

    const { data, loading } = useFetch(`/${endPoint}/popular`)
    // console.log('popular', data)
    function onTabChange(tab) {
        setEndPoint(tab === 'Movie' ? 'movie' : 'tv')
    }

    return (
        <>
            <div className='container'>
                <div className='row mb-3'>
                    <div className='col-xl-10 col-lg-9 col-md-8 col-sm-7 col-5'>
                        <span className="carouselTitle text-white h4">What's Popular</span>
                    </div>
                    <div className='col-xl-2 col-lg-3 col-md-4 col-sm-5 col-7'>
                        <div className='d-flex justify-content-end'>

                            <SwitchTabs data={['Movies', 'TV Shows']} onTabChange={onTabChange} />
                        </div>
                    </div>
                </div>
            </div>
            <Carousel data={data?.results} loading={loading} endPoint={endPoint} />
        </>
    )
}

export default Popular