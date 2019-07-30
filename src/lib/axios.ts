import axios from 'axios';


const instance = axios.create({
  baseURL: 'https://reqres.in/api',
  timeout: 1000
});

export default instance;
