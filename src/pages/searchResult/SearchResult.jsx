import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { FetchDataFromApi } from '../../utils/api'
import ClipLoader from "react-spinners/ClipLoader";
import MovieCard from '../../components/movieCard/movieCard'

function SearchResult() {

    const [data, setData] = useState(null)
    const [pageNum, setPageNum] = useState(1)
    const [loading, setLoading] = useState(1)

    const { query } = useParams()

    const fetchInitialData = () => {
        setLoading(true)
        FetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
            .then((res) => setData(res))

        setPageNum((prev) => prev + 1)
        setLoading(false)
    }

    useEffect(() => {
        setPageNum(1)
        fetchInitialData()
    }, [query])

    const fetchNextPageData = () => {
        FetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
            .then((res) => {
                if (data?.results) {
                    setData({
                        ...data, results: [...data?.results, ...res.results]
                    })
                }
                else {
                    setData(res)
                }
            })
        setPageNum((prev) => prev + 1)
    }


    return (
        <>
            {loading ?
                <div className='d-flex w-100 justify-content-center h-100 align-items-center'>
                    <ClipLoader />
                </div>
                :
                <div className='container' style={{ paddingTop: "100px" }}>
                    {
                        data?.results.length > 0 ?
                            <div className='row mb-4'>
                                <div className='col-12'>
                                    <h4 className="text-white">
                                        {`Search ${data?.results.length > 1 ? 'results' : 'result'}
                                         of '${query}'
                                        `}
                                    </h4>
                                </div>
                                <div className='col-12'>
                                    <InfiniteScroll
                                        className='d-flex flex-wrap'
                                        dataLength={data?.results?.length || []}
                                        next={fetchNextPageData}
                                        hasMore={pageNum <= data?.total_pages}
                                        loader={<ClipLoader />}
                                    >
                                        {data?.results.map((item, index) => {
                                            if (item.media_type === 'person') return;
                                            return (
                                                <MovieCard key={index} data={item} fromSearch={true} />
                                            )
                                        })}
                                    </InfiniteScroll>
                                </div>
                            </div>
                            :
                            <div className="d-flex justify-content-center align-items-center" style={{ height: "500px" }}>
                                <div className="container">
                                    <div className="text-center" style={{ color: "#173d77" }}>
                                        <div style={{ fontSize: "50px", fontWeight: "700" }}>Sorry, Results not found</div>
                                    </div>
                                </div>
                            </div>
                    }
                </div>
            }
        </>
    )
}

export default SearchResult