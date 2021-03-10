import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',

  headers: {
    token: localStorage.getItem('@One:token'),
  },
});

export default api;
