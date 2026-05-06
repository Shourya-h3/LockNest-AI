import axios from 'axios';

const api = axios.create({
  baseURL: `http://${window.location.hostname}:5000/api`,
  withCredentials: true, // Important for cookies
});

export default api;
