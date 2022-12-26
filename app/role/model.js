const mongoose = require('mongoose');
const { Schema } = mongoose;

let roleSchema = new Schema({
  name: String,
});

const Role = mongoose.model('Role', roleSchema);
module.exports = Role;
