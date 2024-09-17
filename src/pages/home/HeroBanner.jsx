import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import useFetch from '../../hooks/useFetch';
import { useSelector } from 'react-redux';
import Img from "../../components/lazyLoadImage/Img";
import './HeroBanner.css';
import ClipLoader from "react-spinners/ClipLoader";

function HeroBanner() {
    const [background, setBackground] = useState('');
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home);
    const { data, loading } = useFetch('/movie/upcoming');

    useEffect(() => {
        const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackground(bg);
    }, [data]);

    function searchQueryHandler(e) {
        if (e.key === 'Enter' && query.length > 0) {
            navigate(`/search/${query}`);
        }
    }

    return (
        <>
            {
                loading ?
                    <div className='d-flex w-100 justify-content-center h-100 align-items-center'>
                        <ClipLoader />
                    </div>
                    :
                    <div className='heroBanner d-flex align-items-center w-100 position-relative'>
                        <div className="w-100 h-100 position-absolute top-0 start-0 opacity-50 overflow-hidden">
                            {
                                background ?
                                    <Img src={background} alt="" className='object-fit-cover w-100 h-100' />
                                    : null
                            }
                        </div>

                        <div className="opacity_layer"></div>


                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="heroBannerContent text-center d-flex flex-column align-items-center text-white">
                                        <span className="title display-4 font-weight-bold">
                                            Welcome
                                        </span>
                                        <span className=" h4 font-weight-normal mb-0 mb-md-4">
                                            Millions of movies, TV shows, and people to discover.
                                            Explore now.
                                        </span>
                                        <div className="searchInput d-flex align-items-center w-100">
                                            <input
                                                type="text"
                                                placeholder='Search for a movie or a TV show...'
                                                onKeyUp={searchQueryHandler}
                                                onChange={(e) => setQuery(e.target.value)}
                                                className="form-control rounded-start"
                                            />
                                            <button className="btn btn-primary rounded-end">Search</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>

    );
}

export default HeroBanner;
