import axios from 'axios';

const URL = 'https://nameless-shadow-4551.fly.dev/api/cart'

const config = (token) => {
  return {
    headers: { Authorization: `Bearer ${token}` }
  };
}

const fetchCart = async (token) => {
  return axios
    .get(URL, config(token))
    .then(res => res.data)
}

const addToCart = async (payload, token) => {
  return axios
    .post(URL, payload, config(token))
    .then(res => res.data)
}

const service = { fetchCart, addToCart };
export default service;