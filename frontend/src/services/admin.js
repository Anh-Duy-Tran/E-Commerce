import axios from 'axios';

const URL = 'https://nameless-shadow-4551.fly.dev/api/users'

const config = (token) => {
  return {
    headers: { Authorization: `Bearer ${token}` }
  };
}

const getAllUser = (token) => {
  return axios
    .get(`${URL}/all`, config(token))
    .then(res => res.data)
}

const service = { getAllUser }
export default service