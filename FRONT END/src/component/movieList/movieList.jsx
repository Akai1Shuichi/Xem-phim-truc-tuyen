import React, { useState, useEffect } from 'react';
import axiosMovieDBAPI, { imageBaseUrl } from '../../services/axiosMovieDBAPI.js';
import { Link } from 'react-router-dom';
import './movieList.css';
const MovieList = ({ title, requestUrl, topMovie, movieArray }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!movieArray) {
      async function getMovie() {
        const response = await axiosMovieDBAPI.get(requestUrl);
        setMovies(response.data.results);
      }
      getMovie();
    }
    else {
      setMovies(movieArray)
    }
  }, [movieArray]);
  return (
    <div className="movie_item_container">
      <h2 className="movie_item_title">{title}</h2>
      <div className="movie_item_content">
        {movies.map((movie) => 
         (
        <>
          {(movie.poster_path || movie.poster) && (
            <Link to={`/movie/${movie.id || movie.id_movie}`}>
          <img
            key={movie.id || movie.id_movie}
            className={`movie_item_img ${topMovie && 'movie_item_img-row'}`}
            src={`${imageBaseUrl}${
              topMovie ? (movie.poster_path || movie.poster) : movie.backdrop_path
            }`}
            alt={movie.title || movie.name_movie}
          />
          </Link>
          )}          
        </>
          )
        )}
      </div>
    </div>
  );
};

export default MovieList;
