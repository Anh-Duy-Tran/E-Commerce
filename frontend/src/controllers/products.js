const findProduct = (productid, allProducts) => {
  return allProducts.find((product) => product._id === productid);
}

export default { findProduct }