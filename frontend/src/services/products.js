import axios from 'axios';

const URL = 'https://nameless-shadow-4551.fly.dev/api/products';
const CATEGORY_URL = 'https://nameless-shadow-4551.fly.dev/api/category';
const STORE_URL = 'https://nameless-shadow-4551.fly.dev/api/store/';

const config = (token) => {
  return {
    headers: { Authorization: `Bearer ${token}` }
  };
}

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

const fetchProductsById = async (productid) => {
  return axios
    .get(`${URL}/${productid}`)
    .then(res => res.data);
}

const addNewProduct = async (token, product) => {
  axios
    .post(URL, product, config(token))
    .then(res => res.data);
}

const deleteProduct = async (token, productId) => {
  axios
    .delete(`${URL}/${productId}`, config(token))
    .then(res => res.data);
}

const service = { deleteProduct, addNewProduct, fetchProducts, fetchCategory, fetchProductFromStore, fetchProductsById };
export default service;