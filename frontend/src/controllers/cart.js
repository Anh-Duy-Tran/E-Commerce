const getAllProductFromCart = () => {
  return Object.keys(localStorage).map( key => ({
      _id: key,
      ...localStorage.getItem(key)
    })
  )
}

const getCartCount = () => {
  return Object.keys(localStorage).reduce(
    (a, c) => a + Number(JSON.parse(localStorage.getItem(c))["amount"]), 0
  )
}

const addToCart = (productid) => {
  if (window.localStorage.getItem(productid) === null) {
    window.localStorage.setItem(productid, JSON.stringify({amount: 1, color: null, size: null}));
  } else {
    const data = JSON.parse(localStorage.getItem(productid));
    data.amount = Number(data.amount) + 1;
    window.localStorage.setItem(productid, JSON.stringify(data));
  }

  return;
}

export default { getAllProductFromCart, addToCart, getCartCount }
