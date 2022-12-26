const mongoose = require('mongoose');

const { Schema } = mongoose;
const testimoniSchema = new Schema({
  clientName: {
    type: String,
  },
  clientFrom: {
    type: String,
  },
  message: {
    type: String,
  },
});

const testimoni = mongoose.model('Testimoni', testimoniSchema);

module.exports = testimoni;
