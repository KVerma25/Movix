import React, { useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import DetailsBanner from './detailsBanner/detailsBanner'
import ActorDetails from './actorDetails/actorDetails'
import Cast from './cast/Cast'
import Similar from './carousels/Similar'
import Recommendation from './carousels/Recommendation'

function Details() {
    const { mediaType, id } = useParams()
    let video = null
    let credits = null
    let creditsLoading = false

    if (mediaType === 'movie' || mediaType === 'tv') {
        const videoFetch = useFetch(`/${mediaType}/${id}/videos`)
        const creditsFetch = useFetch(`/${mediaType}/${id}/credits`)
        video = videoFetch.data
        credits = creditsFetch.data
        creditsLoading = creditsFetch.loading
    }

    return (
        <div>{
            mediaType === 'movie' || mediaType === 'tv' ?
                <>
                    <DetailsBanner
                        video={video?.results[0]}
                        crew={credits?.crew}
                    />
                    <Cast data={credits?.cast} loading={creditsLoading} />
                    <Similar mediaType={mediaType} id={id} />
                    <Recommendation mediaType={mediaType} id={id} />
                </>
                :
                <ActorDetails id={id} />
        }
        </div>
    )
}

export default Details