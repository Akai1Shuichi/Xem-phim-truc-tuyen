import axios from 'axios';

const networkService = axios.create({
  baseURL: 'http://localhost:8080',
});

export const imageBaseUrl = 'https://image.tmdb.org/t/p/original';

export default networkService;
