import React, { useContext, useState, useEffect } from 'react';
import {} from 'react-router-dom';
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import './movie.css';
import useToken from '../../hook/useToken';
import Line from '../UI/line/line';
import ReactPlayer from 'react-player';
import axiosMovie, { imageBaseUrl } from '../../services/axiosMovieAppAPI.js';
import MovieList from '../movieList/movieList';

const Movie = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const dataUser = useContext(UserContext);
  const { token, setToken } = useToken();
  const [movie, setMovie] = useState({});
  const [genres, setGenres] = useState([]);
  const [actors, setActors] = useState([]);
  const [idYoutube, setidYoutube] = useState('');
  const navigate = useNavigate();
  let id = searchParams.get('id');
  let { category } = useParams();
  const [idRm, setIdRm] = useState(0);

  useEffect(() => {
    async function fetchMovie() {
      try {
        // set movie
        const movieResponse = await axiosMovie.get(
          `/movie/${category}?id=${id}`
        );
        setMovie(movieResponse.data);
        const genresNameArray = movieResponse.data.genres.split('-');
        setGenres(genresNameArray);

        // // set actor
        // const actorResponse = await axiosMovie.get(requestActor)
        // const actorData = actorResponse.data.cast.slice(0,10)
        // setActors(actorData)
        // console.log(JSON.stringify(actorData))
        // url video

        const videoUrl = movieResponse.data.url_video;
        setidYoutube(videoUrl);
      } catch (e) {
        console.log(`${e.response.data.message}`);
        setMovie({ over_view: e.response.data.message });
      }

      // add like if have a database
      const like = document.querySelector('#liked');
      // like
      try {
        const movieFavourite = await axiosMovie.get(`/yourFavourite/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const movieFavData = movieFavourite.data;
        setIdRm(movieFavData.id);
        if (movieFavData.love == 1) {
          like.classList.add('red');
        }
      } catch (e) {
        console.log('không thuộc movie yêu thích');
      }
    }
    fetchMovie();
  }, []);

  const handleLike = async () => {
    const like = document.querySelector('#liked');
    like.classList.toggle('red');

    const movieFavourite = {
      id_movie: movie.id,
      id_user: dataUser.id,
      love: 1,
    };

    // add movie phim to mysql
    if (like.classList.contains('red')) {
      axiosMovie.post('/yourFavourite', movieFavourite, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      if (idRm != 0) {
        axiosMovie.patch(
          `/yourFavourite/${idRm}`,
          { love: 0 },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        axiosMovie.patch(
          `/yourFavourite/${movie.id}`,
          { love: 0 },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
    }
  };

  return (
    <div className="movie-container">
      <div className="movie-title">
        <i className="fa fa-arrow-left" onClick={() => navigate(-1)}></i>
        <div style={{ clear: 'both' }}></div>
        <Line h={3} />
      </div>

      <div className="movie-content-container">
        <div className="movie-content-video">
          <ReactPlayer
            width="70%"
            height="100%"
            url={`https://www.youtube.com/watch?v=${idYoutube}`}
            playing={true}
            controls={false}
          />
        </div>

        <div className="movie-content-title">
          <div className="movie-content-title-info">
            <h1 className="movie-name" style={{ display: 'inline-block' }}>
              {movie.title}
            </h1>
            <span className="movie-content-date">{movie.release_date}</span>
            <span className="movie-content-time">{movie.run_time} phút</span>
            <i
              className="fa-solid fa-heart"
              id="liked"
              onClick={handleLike}
            ></i>
          </div>

          <div className="movie-content-rate">
            {Array.from({ length: 5 }).map((_, index) => (
              <>
                {index < Math.round((movie.vote_average / 10) * 5) ? (
                  <i className="fa-solid fa-star loved"></i>
                ) : (
                  <i className="fa-solid fa-star"></i>
                )}
              </>
            ))}

            <span className="movie-content-rate-content">
              {movie.vote_average?.toFixed(1)} Điểm IMDB
            </span>
          </div>
        </div>

        <div className="movie-content-info">
          <div className="movie-content-genres">
            <span>Thể loại : </span>
            {genres.map((gen, index) => (
              <span key={index}>{gen} </span>
            ))}
          </div>
        </div>

        <div className="movie-content-about">
          <h1 className="movie-content-about-title">Nội dung phim</h1>
          <p className="movie-content-about-details">{movie.over_view}</p>
        </div>

        {/* <div className="movie-content-actor">
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
                    </div> */}

        {/* <MovieList title='Phim Liên Quan' requestUrl={`https://api.themoviedb.org/3/movie/${id}/similar?api_key=6a4e748edeaa48397847ba976dbf6ad1&language=vi-VN&page=1`}/> */}
      </div>
    </div>
  );
};

export default Movie;
