import React, { useState, useEffect } from 'react';
import Movie from '../../component/movie/movie';
import NavBar from '../../component/navbar/navbar';
import Footer from '../../component/footer/footer';
import { useNavigate } from 'react-router-dom';
const MoviePage = () => {
  const [check, setCheck] = useState(true);
  const navigate = useNavigate();
  if (check == true) {
    return (
      <div className="movie-page-container">
        <NavBar />
        <Movie handleCheck={setCheck} />
        <Footer />
      </div>
    );
  } else {
    console.log('Không có phim để hiển thị');
    navigate(-1);
  }
};

export default MoviePage;
