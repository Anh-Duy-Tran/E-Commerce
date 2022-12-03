const { connectDB, disconnectDB } = require('../models/db');

const products = require('./products.json').map(product => ({ ...product }));

(async () => {
  connectDB();

  try {
    const Product = require('../models/product');
    await Product.deleteMany({});
    await Product.create(products);
    console.log('Created products');
  } catch (error) {
    console.log(error);
  }

  disconnectDB();
})();
