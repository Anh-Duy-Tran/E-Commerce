const getProductFromShop = (productids, allProducts) => {
  
  return productids.map(id => allProducts[id]);
}

export default { getProductFromShop }