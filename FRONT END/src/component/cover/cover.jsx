import React,{useState, useEffect} from "react";
import axiosMovie, {imageBaseUrl} from '../../services/axiosMovieAppAPI.js'
import requests from "../../services/requests.js";
import './cover.css';

const Cover = () => {
    const [movie,setMovie] = useState({})
    useEffect(() => {
        async function fetchCoverMovie() {
            const response = await axiosMovie.get(requests.fetchTrending);
            // console.log(response)
            let ind = Math.floor(Math.random() * response.data.length);
            setMovie(response.data[ind]);
          }
      
          fetchCoverMovie();
    },[requests.fetchTrending])

    return(
        <div className="cover_container">
                <div className="cover_bg"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: `url("${imageBaseUrl}/${movie?.backdrop_path}")`,
                    backgroundPosition: 'center center',
                }}  
                >
                    <div className="cover_content">
                        <h1 className="cover_title">{movie.title}</h1>
                        <h3 className="cover_over-view">{movie.over_view?.length > 200
                            ? movie.over_view.substring(0, 200) + '...'
                            : movie.over_view}</h3>
                        <div className="cover_btn" style={{paddingTop: 8}}>
                            <button className="btn_play">
                            <i className="fa fa-play"></i> Play
                            </button>

                            <button className="btn_more">
                            <i className="fa fa-info-circle"></i> More Info
                            </button>
                        </div>
                        </div>       
                </div>
            <div className="fade_bottom">
            </div>
        </div>
    )
}

export default Cover
