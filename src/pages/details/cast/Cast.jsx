import React from "react";
import { useSelector } from "react-redux";
import Img from "../../../components/lazyLoadImage/Img";
import avatar from "../../../assets/avatar.png";
import { useNavigate } from "react-router-dom";
import './cast.css'

const Cast = ({ data, loading }) => {
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();

    const skeleton = () => (
        <div className="skItem">
            <div className="circle skeleton mb-3 mb-md-4 rounded-circle"></div>
            <div className="row skeleton"></div>
            <div className="row2 skeleton"></div>
        </div>
    );

    return (
        <div className="mb-4 position-relative">
            <div className="container">
                <h4 className="text-white mb-4">Top Cast</h4>
                {!loading ? (
                    <div className="d-flex overflow-y-hidden gap-3">
                        {data?.map((item) => {
                            let ImgURL = item.profile_path ? url.profile + item.profile_path : avatar;
                            return (
                                <div key={item.id} className="text-white text-center" onClick={() => navigate(`/${item.name}/${item.id}`)}>
                                    <div className="profileImg rounded-circle overflow-hidden mb-3 mb-md-4">
                                        <Img src={ImgURL} alt={item.name} className='w-100 h-100 object-fit-cover'/>
                                    </div>
                                    <div>{item.name}</div>
                                    <div className="character opacity-50">{item.character}</div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="d-flex overflow-y-hidden gap-4">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cast;
