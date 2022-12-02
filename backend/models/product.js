const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SCHEMA_DEFAULTS = {
  name: {
    minLength: 1,
    maxLength: 50
  },
};

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: SCHEMA_DEFAULTS.name.minLength,
    maxLength: SCHEMA_DEFAULTS.name.maxLength,
  },

  price: {
    type: Number,
    required: true,
    validate: {
      validator: function (n) {
        return n > 0;
      },
      message: 'price cannot be 0'
    }
  },

  color: {
    type : [String],
    require : true
  },

  size: {
    type : [String],
    require : true
  },

  idle: {
    type : String,
    require : true
  },

  active: {
    type : String,
    require : true
  },

  image: {
    type: Object,
    require : true
  },

  description: {
    type: String,
    require : true
  }
});

productSchema.set('toJSON', { virtuals: false, versionKey: false });

const Product = new mongoose.model('Product', productSchema);
module.exports = Product;