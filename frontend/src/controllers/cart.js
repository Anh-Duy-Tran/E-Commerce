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

const addToCart = (productid, name, color, size, img) => {
  const key = `${productid}/${color}/${size}`;
  if (window.localStorage.getItem(key) === null) {
    window.localStorage.setItem(key, JSON.stringify({amount: 1, name : name, color: color, size: size, img : img}));
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

export default { getAllProductFromCart, addToCart, getCartCount, removeFromCart, updateAmount }
