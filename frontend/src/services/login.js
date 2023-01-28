import axios from 'axios';

const baseURL = "https://nameless-shadow-4551.fly.dev"
const URL = `${baseURL}/api/login`;
const AUTH_URL = `${baseURL}/api/auth`;

const login = async (payload) => {
  return axios
    .post(URL, payload)
    .then(res => res.data)
    .catch(() => {});
}

const authenticate = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  return axios
    .get(AUTH_URL, config)
    .then(res => res.data)
}

const service = { login, authenticate };
export default service;