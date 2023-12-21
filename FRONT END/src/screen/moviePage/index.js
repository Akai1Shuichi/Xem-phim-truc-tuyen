import React, { useState, useEffect } from 'react';
import Movie from '../../component/movie/movie';
import NavBar from '../../component/navbar/navbar';
import Footer from '../../component/footer/footer';
import { useNavigate } from 'react-router-dom';
const MoviePage = () => {
  return (
    <div className="movie-page-container">
      <NavBar />
      <Movie />
      <Footer />
    </div>
  );
};

export default MoviePage;
