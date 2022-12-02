import axios from 'axios';

const URL = 'http://localhost:3001/api/login'

const login = async (payload) => {
  const req = axios.post(URL, payload);
  return req.then(res => res.data);
}

const service = { login };
export default service;