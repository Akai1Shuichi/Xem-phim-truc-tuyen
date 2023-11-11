import axios from 'axios';

const networkService = axios.create({
  baseURL: 'http://localhost:8080',
});

export default networkService;
