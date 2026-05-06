import axios from 'axios';

const api = axios.create({
  baseURL: window.location.hostname === 'localhost' || 
           window.location.hostname === '127.0.0.1' || 
           window.location.hostname.includes('192.168.') ||
           window.location.hostname.includes('172.16.') ||
           window.location.hostname.includes('10.')
    ? `http://${window.location.hostname}:5000/api`
    : '/api',
  withCredentials: true, // Important for cookies
});

export default api;
