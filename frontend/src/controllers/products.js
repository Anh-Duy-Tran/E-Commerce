const getProductFromShop = (productids, allProducts) => {
  return productids.map(id => allProducts[id]);
}

const findProduct = (productid, allProducts) => {
  return productid in allProducts ? allProducts[productid] : undefined;
}

export default { getProductFromShop, findProduct }