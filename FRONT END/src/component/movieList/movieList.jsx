import React, { useState, useEffect } from 'react';
import axiosMovie, { imageBaseUrl } from '../../services/axiosMovieAppAPI';
import { Link } from 'react-router-dom';
import './movieList.css';
const MovieList = ({ title, requestUrl, topMovie, movieArray }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!movieArray) {
      async function getMovie() {
        const response = await axiosMovie.get(requestUrl);
        // console.log(JSON.stringify(response))
        setMovies(response.data);
      }
      getMovie();
    } else {
      setMovies(movieArray);
    }
  }, [movieArray]);
  return (
    <div className="movie_item_container">
      <h2 className="movie_item_title">{title}</h2>
      <div className="movie_item_content">
        {movies.map((movie) => (
          <>
            {(movie.poster_path || movie.poster) && (
              <Link to={`/movie/${movie.category}?id=${movie.id_movie}`}>
                <img
                  className={`movie_item_img ${
                    topMovie && 'movie_item_img-row'
                  }`}
                  src={`${imageBaseUrl}${
                    topMovie ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt={movie.title}
                />
              </Link>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
