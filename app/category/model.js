const mongoose = require('mongoose');
const { Schema } = mongoose;

let categorySchema = new Schema({
  name: String,
  //   require: [true, 'nama kategori harus ada'],
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
