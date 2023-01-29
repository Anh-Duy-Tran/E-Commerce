import axios from 'axios';

const baseURL = "https://nameless-shadow-4551.fly.dev"
const URL = `${baseURL}/api/login`;
const URL_REGISTER = `${baseURL}/api/register`;
const AUTH_URL = `${baseURL}/api/auth`;

const login = async (payload) => {
  return axios
    .post(URL, payload)
    .then(res => res.data)
}

const register = async (payload) => {
  return axios
    .post(URL_REGISTER, payload)
    .then(res => res.data)
}

const authenticate = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  return axios
    .get(AUTH_URL, config)
    .then(res => res.data)
}

const service = { login, register, authenticate };
export default service;