import axios from 'axios';

const URL = 'http://localhost:3001/api/products'
const CATEGORY_URL = 'http://localhost:3001/api/category'

const fetchProducts = async () => {
  return axios
    .get(URL)
    .then(res => res.data);
}

const fetchCategory = async () => {
  return axios
    .get(CATEGORY_URL)
    .then(res => res.data);
}

const service = { fetchProducts, fetchCategory };
export default service;