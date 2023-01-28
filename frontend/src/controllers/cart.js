import Cookies from 'js-cookie'
import userService from '../services/user'

const getAllProductFromCart = () => {
  return Object.keys(localStorage).map( key => ({
      _id: key.split('/')[0],
      uniqueKey: key,
      ...JSON.parse(localStorage.getItem(key))
    })
  )
}

const getCartCount = () => {
  return Object.keys(localStorage).reduce(
    (a, c) => a + Number(JSON.parse(localStorage.getItem(c))["amount"]), 0
  )
}

const getTotalCartPrice = () => {
  return Object.keys(localStorage).reduce(
    (a, productid) => {
      const product = JSON.parse(localStorage.getItem(productid));
      return a + Number(product["amount"]) * Number(product["price"]);
    }, 0);
}

const addToCart = (productid, name, color, size, price, img) => {
  const key = `${productid}/${color}/${size}`;
  if (window.localStorage.getItem(key) === null) {
    window
      .localStorage
      .setItem(key, JSON.stringify({amount: 1, 
                                    name : name, 
                                    color: color, 
                                    size: size, 
                                    price : price, 
                                    img : img}));
  } else {
    const data = JSON.parse(localStorage.getItem(key));
    data.amount = Number(data.amount) + 1;
    window.localStorage.setItem(key, JSON.stringify(data));
  }

  return;
}

const removeFromCart = (productid) => {
  localStorage.removeItem(productid);
}

const updateAmount = (productid, amount) => {
  const data = JSON.parse(localStorage.getItem(productid));
  localStorage.removeItem(productid);
  localStorage.setItem(productid, JSON.stringify({...data, amount : amount}));
}

const mergeFetchedCart = (fetchedCart) => {
  Object.keys(fetchedCart).forEach(id => {
    const value = fetchedCart[id];
    if (localStorage.getItem(id) === null) {
      localStorage.setItem(id, value);
    } else {
      const localCartItem = localStorage.getItem(id);
      localStorage.setItem(id, {...localCartItem, amount : localCartItem.amount + value.amount});
    }
  })

  for (const [key, value] of Object.entries(localStorage)) {
    console.log(key, value);
    userService.addToCart({key, value : JSON.stringify(value)}, Cookies.get('access_token'));
  }
}

const clearLocalCart = () => {
  localStorage.clear();
  updateAmount();
}


const services = { clearLocalCart, mergeFetchedCart, getTotalCartPrice, getAllProductFromCart, addToCart, getCartCount, removeFromCart, updateAmount };
export default services;
