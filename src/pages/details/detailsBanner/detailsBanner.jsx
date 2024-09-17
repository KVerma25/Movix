import React, { useState } from "react";
import useFetch from '../../../hooks/useFetch.jsx'
import { useParams } from 'react-router-dom'
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/circleRating.jsx";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import "./detailsBanner.css";
import { PlayIcon } from "../PlayIcon.jsx";
import VideoPopup from "../../../components/videoPopup/videoPopup.jsx";


const DetailsBanner = ({ video, crew }) => {

    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);
    const { url } = useSelector((state) => state.home)
    const { mediaType, id } = useParams()
    const { data, loading } = useFetch(`/${mediaType}/${id}`)

    // console.log(data)

    const director = crew?.filter((f) => f.job === 'Director')
    const writer = crew?.filter((f) => f.job === 'Screenplay' ||
        f.job === 'Story' || f.job === 'Writer')

    // console.log('directw', director, writer)

    const _genres = data?.genres?.map((item) => item.id)


    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };


    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                    {!!data && (
                        <>
                            <div className="backdrop-img w-100 h-100 position-absolute top-0 start-0 overflow-hidden">
                                <Img src={url.backdrop + data?.backdrop_path} />
                            </div>
                            <div className="opacity-layer">
                            </div>
                            <div className="container">
                                <div className="content position-relative pt-3 pt-md-0">
                                    <div className="row">
                                        <div className="left col-md-3">
                                            {
                                                data.poster_path ?
                                                    <Img className='posterImg'
                                                        src={url.backdrop + data.poster_path}
                                                    />
                                                    :
                                                    <Img className='posterImg'
                                                        src={PosterFallback}
                                                    />
                                            }
                                        </div>
                                        <div className="right text-white col-md-9 pt-4 pt-md-0">
                                            <h2>
                                                {`${data.name || data.title} (${dayjs(data?.release_date).format('YYYY')})`}
                                            </h2>
                                            <h5 className=" fst-italic opacity-50 mb-3">
                                                {data.tagline}
                                            </h5>
                                            <Genres data={_genres} />
                                            <div className="row">
                                                <div className="mb-2">
                                                    <CircleRating rating={data.vote_average.toFixed(1)} />
                                                </div>
                                                <div className="playbtn cursor-pointer d-flex align-items-center gap-2" onClick={() => {
                                                    setShow(true);
                                                    setVideoId(video.key);
                                                }}>
                                                    <PlayIcon />
                                                    <span className="text">Watch Trailer</span>
                                                </div>
                                            </div>
                                            <div className="overview mt-4">
                                                <h4 className="heading">
                                                    Overview
                                                </h4>
                                                <div className="description">
                                                    {data.overview}
                                                </div>
                                            </div>
                                            <div className="info d-flex">
                                                {data.status && (
                                                    <div className="infoItem d-flex">
                                                        <span className="fw-bold
                                                    ">
                                                            Status:{" "}
                                                        </span>
                                                        <span className="ms-1 opacity-50">
                                                            {data.status}
                                                        </span>
                                                    </div>
                                                )}
                                                {data.release_date && (
                                                    <div className="infoItem">
                                                        <span className="fw-bold
                                                    ">
                                                            Release Date:{" "}
                                                        </span>
                                                        <span className="ms-1 opacity-50">
                                                            {dayjs(data.release_date).format('MMM D, YYYY')}
                                                        </span>
                                                    </div>
                                                )}
                                                {data.runtime && (
                                                    <div className="infoItem">
                                                        <span className="fw-bold
                                                    ">
                                                            RunTime:{" "}
                                                        </span>
                                                        <span className="ms-1 opacity-50">
                                                            {toHoursAndMinutes(data.runtime)}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {director?.length > 0 && (
                                                <div className="info">
                                                    <span className="fw-bold">
                                                        Director:{" "}
                                                    </span>
                                                    <span className="ms-1 opacity-50">
                                                        {director.map((d, i) =>
                                                            <span key={i}>
                                                                {d.name}
                                                                {director.length - 1 !== i && ', '}
                                                            </span>
                                                        )}
                                                    </span>
                                                </div>
                                            )}
                                            {writer?.length > 0 && (
                                                <div className="info">
                                                    <span className="fw-bold">
                                                        Writer:{" "}
                                                    </span>
                                                    <span className="ms-1 opacity-50">
                                                        {writer.map((d, i) =>
                                                            <span key={i}>
                                                                {d.name}
                                                                {writer.length - 1 !== i && ', '}
                                                            </span>
                                                        )}
                                                    </span>
                                                </div>
                                            )}

                                            {data?.created_by?.length > 0 && (
                                                <div className="info">
                                                    <span className="fw-bold">
                                                        Creator:{" "}
                                                    </span>
                                                    <span className="ms-1 opacity-50">
                                                        {data.created_by.map((d, i) =>
                                                            <span key={i}>
                                                                {d.name}
                                                                {data.created_by.length - 1 !== i && ', '}
                                                            </span>
                                                        )}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <VideoPopup
                                            show={show}
                                            setShow={setShow}
                                            videoId={videoId}
                                            setVideoId={setVideoId}
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                    }
                </>

            ) : (
                <div className="detailsBannerSkeleton">
                    <div className="container">
                        <div className="row">
                            <div className="left skeleton col-md-3"></div>
                            <div className="right col-md-8 offset-md-1 pt-5 pt-md-0">
                                <div className="row skeleton"></div>
                                <div className="row skeleton"></div>
                                <div className="row skeleton"></div>
                                <div className="row skeleton"></div>
                                <div className="row skeleton"></div>
                                <div className="row skeleton"></div>
                                <div className="row skeleton"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;