import { React, useState, useEffect, createContext } from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import axiosMovie from '../src/services/axiosMovieAppAPI';
import LoginPage from './screen/loginPage';
import MainPage from './screen/mainPage';
import InforUserPage from './screen/inforUserPage';
import MoviePage from './screen/moviePage';
import useToken from './hook/useToken';

export const UserContext = createContext();

const App = () => {
  const { token, setToken } = useToken();
  const [user, setUser] = useState(null);
  const [movieFavourite, setMovieFavourite] = useState([]);
  useEffect(() => {
    async function getUser(tk) {
      try {
        const response = await axiosMovie.get('/you', {
          headers: { Authorization: `Bearer ${tk}` },
        });
        setUser(response.data);

        const responseMovie = await axiosMovie.get('/yourFavourite', {
          headers: { Authorization: `Bearer ${tk}` },
        });
        setMovieFavourite(responseMovie.data);
      } catch (error) {
        console.log('Lỗi không get được token');
        setToken('');
      }
    }
    if (token) {
      getUser(token);
    }
  }, [token]);

  if (!token) {
    return <LoginPage setToken={setToken} />;
  } else {
    if (user) {
      return (
        <div>
          <BrowserRouter>
            <Routes>
              <Route path="/home" element={<MainPage setToken={setToken} />} />
              <Route path="/" element={<Navigate replace to="/home" />} />
              <Route
                path="/info-user"
                element={
                  <UserContext.Provider value={{ user, movieFavourite }}>
                    <InforUserPage />
                  </UserContext.Provider>
                }
              />
              <Route
                path="/movie/:category"
                element={
                  <UserContext.Provider value={user}>
                    <MoviePage />
                  </UserContext.Provider>
                }
              />
            </Routes>
          </BrowserRouter>
        </div>
      );
    }
  }
};
export default App;
