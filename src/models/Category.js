const mongoose = require('mongoose');

//MongoDB Schema for the users
const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: [true, 'Name must be unique'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
