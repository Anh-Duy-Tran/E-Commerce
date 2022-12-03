import axios from 'axios';

const URL = 'http://localhost:3001/api/products';
const CATEGORY_URL = 'http://localhost:3001/api/category';
const STORE_URL = 'http://localhost:3001/api/store/';

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

const fetchProductFromStore = async (store) => {
  let store_url = STORE_URL;
  Object.keys(store).forEach(keys => store_url += store[keys] + '/');
  return axios
    .get(store_url)
    .then(res => res.data);
}

const service = { fetchProducts, fetchCategory, fetchProductFromStore };
export default service;