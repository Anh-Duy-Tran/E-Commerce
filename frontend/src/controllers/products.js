const findProduct = (productid, allProducts) => {
  return allProducts.find((product) => product._id === productid);
  return productid in allProducts ? allProducts[productid] : undefined;
}

export default { findProduct }