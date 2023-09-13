import axios from 'axios';
const REACT_APP_URL_API = 'https://reqres.in/api';
const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = REACT_APP_URL_API;
export default axiosInstance;
