import React, { useContext, useEffect, useState } from 'react';
import './inforUser.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App.js';
import axiosMovieAppAPI from '../../services/axiosMovieAppAPI.js';
import useToken from '../../hook/useToken.js';
import MovieList from '../movieList/movieList.jsx';
import Button from '../UI/button/button';
import Line from '../UI/line/line';
import avatartPath from '../../assets/avatar.jpg';

const InforUserContent = () => {
  const navigate = useNavigate();
  const { user, movieFavourite } = useContext(UserContext);
  const [movies, setMovies] = useState(movieFavourite);
  const { token, setToken } = useToken();
  // useEffect(() => {
  //   setMovies(movieFavourite)
  // },[movieFavourite])

  useEffect(() => {
    async function getMovieFavourite() {
      const responseMovie = await axiosMovieAppAPI.get('/yourFavourite', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMovies(responseMovie.data);
    }
    getMovieFavourite();
  }, []);

  const handleNavbar = (index) => {
    const myInfo = document.querySelector('#my-info');
    const myMovie = document.querySelector('#my-movie');

    if (index == 1) {
      myInfo.classList.remove('hidden');
      myMovie.classList.add('hidden');
    } else {
      myInfo.classList.add('hidden');
      myMovie.classList.remove('hidden');
    }
  };
  const handleLogout = async () => {
    await axiosMovieAppAPI.post('/logout', null, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setToken('');
    window.location.reload();
  };
  return (
    <div className="infor-user-content-container">
      <div className="infor-user-content-title">
        <i class="fa fa-arrow-left" onClick={() => navigate(-1)}></i>
        <Button index={1} text={'Đăng xuất'} onClick={handleLogout} />
        <div style={{ clear: 'both' }}></div>
        <Line h={3} />
      </div>
      <div className="infor-user-content-list">
        <div className="infor-user-content-item">
          <div className="infor-user-content-info-title">
            <img src={avatartPath} className="infor-user-content-avatar" />
            <h1>{user.name}</h1>
            <p>{user.email}</p>
          </div>
          <div className="infor-user-content-navbar">
            <h2 onClick={() => handleNavbar(1)}>Thông tin cá nhân</h2>
            <h2 onClick={() => handleNavbar(2)}>Phim yêu thích</h2>
          </div>
        </div>
        <div className="infor-user-content-item" id="my-info">
          <div className="infor-user-content-info-main">
            <h1>Thông tin cá nhân</h1>
            <p>
              Nơi quản lý thông tin cá nhân của bạn bao gồm tên, số điện thoại,
              email
            </p>
          </div>

          <form className="login_form">
            <div className="input_name login_form_input">
              <input
                type="text"
                className="form_input"
                id="form_name"
                value={user.name}
              ></input>
              <label for="form_name" className="placeLabel">
                Name
              </label>
            </div>

            <div className="input_email login_form_input">
              <input
                type="text"
                className="form_input"
                id="form_email"
                value={user.email}
              ></input>
              <label for="form_email" className="placeLabel">
                Email
              </label>
            </div>

            <div className="more_infor">
              <div className="input_email login_form_input">
                <input
                  type="text"
                  className="form_input"
                  id="form_phone"
                  value={user.phone}
                ></input>
                <label for="form_phone" className="placeLabel">
                  Phone
                </label>
              </div>
              <div className="age_form">
                <span>Age :</span>
                <input type="number" value={user.age} min="0" />
              </div>
            </div>

            <div className="input_password login_form_input">
              <input
                type="password"
                className="form_input"
                id="form_password"
                value={user.password}
              ></input>
              <label for="form_password" className="placeLabel">
                Mật khẩu
              </label>
            </div>
          </form>
        </div>

        <div className="infor-user-content-item hidden" id="my-movie">
          <h1>Phim Yêu Thích</h1>
          <p>
            Nơi quản lý những bộ phim bạn đã yêu thích trên trang web của chúng
            tôi
          </p>
          <MovieList topMovie movieArray={movies} />
        </div>
      </div>
    </div>
  );
};

export default InforUserContent;
