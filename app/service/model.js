const mongoose = require('mongoose');

const { Schema } = mongoose;

const serviceSchema = new Schema(
  {
    name: {
      type: String,
      require: [true, 'Nama harus diisi'],
    },
    description: {
      type: String,
      require: [true, 'deskripsi harus diisi'],
    },
    detailDescription: {
      type: String,
      require: [true, 'deskripsi detail page harus diisi'],
    },
    thumbnail: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true },
);
const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
