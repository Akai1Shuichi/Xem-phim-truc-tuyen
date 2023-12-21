import React from 'react';
import NavBar from '../../component/navbar/navbar';
import Cover from '../../component/cover/cover';
import MovieList from '../../component/movieList/movieList';
import requests from '../../services/requests';
import Footer from '../../component/footer/footer';
const MainPage = () => {
  return (
    <div className="home_main_container">
      <NavBar />

      <Cover />

      <div className="movie_main_container">
        <MovieList
          title="Bản Gốc Phim GVBT "
          requestUrl={requests.fetchTrending}
          topMovie
        />

        <MovieList
          title="Bình chọn nhiều nhất"
          requestUrl={requests.fetchTopRated}
        />
        <MovieList
          title="Phổ biến hiện nay"
          requestUrl={requests.fetchPopular}
        />
        <MovieList title="Phim Hài" requestUrl={requests.fetchComedy} />
        <MovieList title="Phim Hành Động" requestUrl={requests.fetchAction} />
        <MovieList title="Phim Kinh Dị" requestUrl={requests.fetchHorror} />
      </div>

      <Footer />
    </div>
  );
};

export default MainPage;
