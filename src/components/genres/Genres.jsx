import React from 'react'
import { useSelector } from 'react-redux'
import './Genres.css'

function Genres({ data }) {

    const { genres } = useSelector((state) => state.home)

    return (
        <div className='z-1 gap-1 justify-content-end d-lg-flex d-none flex-wrap'>
            {
                data?.map((item) => {
                    if (!genres[item]?.name) return;
                    return (
                        <div key={item} className="genre">
                            {genres[item]?.name}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Genres