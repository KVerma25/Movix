import React, { useState } from "react";
import useFetch from '../../../hooks/useFetch.jsx'
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import "../detailsBanner/detailsBanner.jsx";
import Carousel from "../../../components/carousel/carousel.jsx";

const actorDetails = ({ id }) => {

    const actor = true

    const { url } = useSelector((state) => state.home)

    const { data, loading } = useFetch(`/person/${id}`)
    const { data: combined_credits, loading: combined_credits_loading } = useFetch(`/person/${id}/combined_credits`)


    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                    {!!data &&
                        <>
                            <div className="backdrop-img  w-100 h-100 position-absolute top-0 start-0 overflow-hidden">
                                <Img src={url.backdrop + data?.profile_path} />
                            </div>
                            <div className="opacity-layer">
                            </div>
                            <div className="container">
                                <div className="content position-relative pt-3 pt-md-0">
                                    <div className="row">
                                        <div className="left col-md-3 text-white">
                                            {
                                                data.profile_path ?
                                                    <Img className='posterImg'
                                                        src={url.backdrop + data.profile_path}
                                                    />
                                                    :
                                                    <Img className='posterImg'
                                                        src={PosterFallback}
                                                    />
                                            }
                                            <div className="info mt-3">
                                                {data.known_for_department && (
                                                    <div className="infoItem">
                                                        <span className="fw-bold
                                                    ">
                                                            Known For:{" "}
                                                        </span>
                                                        <span className="ms-1 opacity-50">
                                                            {data.known_for_department}
                                                        </span>
                                                    </div>
                                                )}
                                                {data.gender && (
                                                    <div className="infoItem">
                                                        <span className="fw-bold
                                                    ">
                                                            Gender:{" "}
                                                        </span>
                                                        <span className="ms-1 opacity-50">
                                                            {
                                                                data.gender == 2 ? "Male" : "Female"
                                                            }
                                                        </span>
                                                    </div>
                                                )}
                                                {data.birthday && (
                                                    <div className="infoItem">
                                                        <span className="fw-bold
                                                    ">
                                                            Birthday:{" "}
                                                        </span>
                                                        <span className="ms-1 opacity-50">
                                                            {dayjs(data.birthday).format("MMMM DD, YYYY")}
                                                        </span>
                                                    </div>
                                                )}
                                                {data.place_of_birth && (
                                                    <div className="infoItem">
                                                        <span className="fw-bold
                                                    ">
                                                            Place of Birth:{" "}
                                                        </span>
                                                        <span className="ms-1 opacity-50">
                                                            {data.place_of_birth}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="right text-white col-md-9 ">
                                            <h2 className="title">
                                                {`${data.name || data.title} (${dayjs(data?.release_date).format('YYYY')})`}
                                            </h2>
                                            <div className="fst-italic opacity-50">
                                                {data.tagline}
                                            </div>
                                            <div className="overview mt-3">
                                                {
                                                    data?.biography &&
                                                    <>
                                                        <h4 className="heading">
                                                            Biography
                                                        </h4>
                                                        <div className="description">
                                                            {data?.biography?.slice(0, 1800)}...
                                                        </div>
                                                    </>
                                                }
                                                <div>
                                                    <div className="heading">
                                                        {
                                                            combined_credits?.cast &&
                                                            <>
                                                                <p className="fw-bold my-3">Known For</p>
                                                                <Carousel
                                                                    data={combined_credits?.cast}
                                                                    loading={combined_credits_loading}
                                                                    actor={actor}
                                                                />
                                                            </>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
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
            )
            }
        </div >
    );
};

export default actorDetails;