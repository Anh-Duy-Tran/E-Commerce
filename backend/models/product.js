import { mongo, Schema } from 'mongoose';

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
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
    type: [String],
    required: true
  },
  image: {
    type: Object
  },
  description: {
    type: String
  }
});

productSchema.set('toJSON', { virtuals: false, versionKey: false });

const Product = new mongo