import axios from 'axios';

const URL = 'http://localhost:3001/api/login'
const AUTH_URL = 'http://localhost:3001/api/auth'

const login = async (payload) => {
  return axios
    .post(URL, payload)
    .then(res => res.data);
}

const authenticate = async (token) => {
  return axios
    .get(AUTH_URL, token)
    .then(res => res.data)
    .catch((err) => console.log(err));
}

const service = { login, authenticate };
export default service;