import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";
import useFetch from "../../hooks/useFetch";
import { FetchDataFromApi } from "../../utils/api";
import MovieCard from "../../components/movieCard/movieCard";
import "./style.css";
import ClipLoader from "react-spinners/ClipLoader";

let filters = {};

const sortbyData = [
    { value: "popularity.desc", label: "Popularity Descending" },
    { value: "popularity.asc", label: "Popularity Ascending" },
    { value: "vote_average.desc", label: "Rating Descending" },
    { value: "vote_average.asc", label: "Rating Ascending" },
    {
        value: "primary_release_date.desc",
        label: "Release Date Descending",
    },
    { value: "primary_release_date.asc", label: "Release Date Ascending" },
    { value: "original_title.asc", label: "Title (A-Z)" },
];

const Explore = () => {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const [genre, setGenre] = useState(null);
    const [sortby, setSortby] = useState(null);
    const { mediaType } = useParams();

    const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

    const fetchInitialData = () => {
        setLoading(true);
        FetchDataFromApi(`/discover/${mediaType}`, filters).then((res) => {
            setData(res);
            setPageNum((prev) => prev + 1);
            setLoading(false);
        });
    };

    const fetchNextPageData = () => {
        FetchDataFromApi(
            `/discover/${mediaType}?page=${pageNum}`,
            filters
        ).then((res) => {
            if (data?.results) {
                setData({
                    ...data,
                    results: [...data?.results, ...res.results],
                });
            } else {
                setData(res);
            }
            setPageNum((prev) => prev + 1);
        });
    };

    useEffect(() => {
        filters = {};
        setData(null);
        setPageNum(1);
        setSortby(null);
        setGenre(null);
        fetchInitialData();
    }, [mediaType]);

    const onChange = (selectedItems, action) => {
        if (action.name === "sortby") {
            setSortby(selectedItems);
            if (action.action !== "clear") {
                filters.sort_by = selectedItems.value;
            } else {
                delete filters.sort_by;
            }
        }

        if (action.name === "genres") {
            setGenre(selectedItems);
            if (action.action !== "clear") {
                let genreId = selectedItems.map((g) => g.id);
                genreId = JSON.stringify(genreId).slice(1, -1);
                filters.with_genres = genreId;
            } else {
                delete filters.with_genres;
            }
        }

        setPageNum(1);
        fetchInitialData();
    };

    return (
        <div className="explorePage">
            <div className="container">
                <div className="row mb-3">
                    <div className="col-lg-4">
                        <h4 className="text-white">
                            {mediaType === "tv"
                                ? "Explore TV Shows"
                                : "Explore Movies"}
                        </h4>
                    </div>
                    <div className="col-lg-8">
                        <div className="filters d-flex flex-md-row gap-2 flex-column justify-content-end ">
                            <Select
                                isMulti
                                name="genres"
                                value={genre}
                                closeMenuOnSelect={false}
                                options={genresData?.genres}
                                getOptionLabel={(option) => option.name}
                                getOptionValue={(option) => option.id}
                                onChange={onChange}
                                placeholder="Select genres"
                                className="react-select-container genresDD"
                                classNamePrefix="react-select"
                            />
                            <Select
                                name="sortby"
                                value={sortby}
                                options={sortbyData}
                                onChange={onChange}
                                isClearable={true}
                                placeholder="Sort by"
                                className="react-select-container sortbyDD"
                                classNamePrefix="react-select"
                            />
                        </div>
                    </div>
                </div>
                {loading ?
                    <div className='d-flex w-100 justify-content-center h-100 align-items-center'>
                        <ClipLoader />
                    </div>
                    :
                    <>
                        {data?.results?.length > 0 ? (
                            <div className="col-12">
                                <InfiniteScroll
                                    className="d-flex flex-wrap"
                                    dataLength={data?.results?.length || []}
                                    next={fetchNextPageData}
                                    hasMore={pageNum <= data?.total_pages}
                                    loader={<ClipLoader />}
                                >
                                    {data?.results?.map((item, index) => {
                                        if (item.media_type === "person") return;
                                        return (
                                            <MovieCard
                                                key={index}
                                                data={item}
                                                mediaType={mediaType}
                                            />
                                        );
                                    })}
                                </InfiniteScroll>
                            </div>
                        ) : (
                            <span className="resultNotFound">
                                Sorry, Results not found!
                            </span>
                        )}
                    </>
                }
            </div>
        </div>
    );
};

export default Explore;