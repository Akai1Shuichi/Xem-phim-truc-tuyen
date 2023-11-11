import React, {useContext, useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import './movie.css'
import axiosMovieAppAPI from '../../services/axiosMovieAppAPI';
import useToken from "../../hook/useToken";
import Line from "../UI/line/line";
import ReactPlayer from 'react-player';
import axiosMovieDBAPI,{ imageBaseUrl } from "../../services/axiosMovieDBAPI";
import MovieList from "../movieList/movieList";


const Movie = ({handleCheck}) => {
    const dataUser = useContext(UserContext)

    const { token, setToken } = useToken();
    const [movie,setMovie] = useState({});
    const [actors,setActors] = useState([])
    const [idYoutube,setidYoutube] = useState('')
    const navigate = useNavigate()
    let {id} = useParams()
    const requestMovie = `https://api.themoviedb.org/3/movie/${id}?api_key=6a4e748edeaa48397847ba976dbf6ad1&language=vi-VN`
    const requestActor = `http://api.themoviedb.org/3/movie/${id}/casts?api_key=e9e9d8da18ae29fc430845952232787c&language=vi-VN`
    const requestYoutube = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=6a4e748edeaa48397847ba976dbf6ad1`
    useEffect(() => {     
        async function fetchMovie() {
            try {
                // set movie
                const movieResponse = await axiosMovieDBAPI.get(requestMovie)
                setMovie(movieResponse.data)
                // set actor
                const actorResponse = await axiosMovieDBAPI.get(requestActor)
                const actorData = actorResponse.data.cast.slice(0,10)
                setActors(actorData)
                // console.log(JSON.stringify(actorData))
                // url video
                const videoUrlresponse = await axiosMovieDBAPI.get(requestYoutube)
                const videoUrl = videoUrlresponse.data.results[0].key
                setidYoutube(videoUrl)
                
                 // add like if have a database
             const like = document.querySelector('#liked')
             // like
             try {
                await axiosMovieAppAPI.get(`/yourfavourite/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                like.classList.add('red')
             }
             catch(e) {
                console.log('không thuộc movie yêu thích')
             }

                handleCheck(true)
            }
            catch(e) {
                console.log('Không có video !!!')
                handleCheck(false)
            }
        }
        fetchMovie()

    }, [])

    const handleLike = async () => {
        const like = document.querySelector('#liked')
        like.classList.toggle('red')
        
        const movieFavourite = {
            id_movie : id,
            id_user : dataUser.id,
            name_movie: movie.title,
            poster: movie.poster_path
        }
        
        // add movie phim to mysql
        if (like.classList.contains('red')) {
            axiosMovieAppAPI.post('/addfavourte', movieFavourite, {
                headers: { Authorization: `Bearer ${token}` }
            })
        }
        else {
            axiosMovieAppAPI.delete(`/yourfavourite/${id}`, {
                headers: {Authorization: `Bearer ${token}`}
            })
        }
    
    }

    if(idYoutube != '') {
        return (
            <div className="movie-container">
                <div className="movie-title">
                    <i class="fa fa-arrow-left" onClick={() => navigate(-1)}></i>
                    <div style={{ clear: 'both' }}></div>
                    <Line h={3}/>
                </div>
    
                <div className="movie-content-container">
                    <div className="movie-content-video">
                    <ReactPlayer width="70%" height='100%' url={`https://www.youtube.com/watch?v=${idYoutube}`}
                    playing={true}
                    controls={false} 
                    />
                    </div>
                   
                    <div className="movie-content-title">
                        <div className="movie-content-title-info">
                        <h1 className="movie-name" style={{display: 'inline-block'}}>{movie.title}</h1>
                        <span className="movie-content-date">{movie.release_date}</span>
                        <span className="movie-content-time">{movie.runtime} phút</span>
                        <i class="fa-solid fa-heart" id="liked" onClick={handleLike}></i>
                        </div>
                    
                        <div className="movie-content-rate">
                            {
                                Array.from({ length: 5 }).map((_, index) => 
                                (
                                <>
                                {index < Math.round(movie.vote_average / 10 * 5) ?
                                   <i className="fa-solid fa-star loved"></i>
                                   : <i className="fa-solid fa-star"></i>
                                }
                                 </>
                                ))
                            }

                            <span className="movie-content-rate-content">{movie.vote_average.toFixed(1)} Điểm IMDB</span>
                        </div>
                    </div>
                    
                    <div className="movie-content-info">
                        <div className="movie-content-genres">
                            <span>Thể loại : </span>
                         {
                            movie.genres.map((gen) => (
                                <span key={gen.id}>{gen.name}  </span>
                            )) 
                         }
                        </div>
                        
                        
                    </div>
    
                    <div className="movie-content-about">
                        <h1 className="movie-content-about-title">Nội dung phim</h1>
                        <p className="movie-content-about-details">{movie.overview}</p>
                    </div>
    
                    <div className="movie-content-actor">
                        <h1>Diễn Viên</h1>
                        <div className="movie-content-actor-slider"> 
                            { actors.map((actor) => (
                                <div className="movie-content-slider-item" key={actor.id}>
                                <div className="movie-content-img-wrapper">
                                <img src={`${imageBaseUrl}/${actor.profile_path}`} />
                                </div>    
                                <p>{actor.name}</p>
                            </div>
                            ))}
                        </div>
                    </div>

                    <MovieList title='Phim Liên Quan' requestUrl={`https://api.themoviedb.org/3/movie/${id}/similar?api_key=6a4e748edeaa48397847ba976dbf6ad1&language=vi-VN&page=1`}/>
                </div>
            </div>
        )
    }
    
}

export default Movie