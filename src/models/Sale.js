const mongoose = require('mongoose');

//MongoDB Schema for the users
const saleSchema = mongoose.Schema({
  user: { require: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  paid: {
    type: Boolean,
    default: false,
  },
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
