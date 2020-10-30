const mongoose = require('mongoose');

//MongoDB Schema for the users
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  company: {
    type: String,
    required: [true, 'Company is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  amount: {
    type: Number,
    required: [true, 'Price is required'],
  },
  features: {
    type: Array,
  },
  category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
