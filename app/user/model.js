const mongoose = require('mongoose');
const { Schema } = mongoose;

let userSchema = new Schema(
  {
    email: {
      type: String,
      require: [true, 'Email harus diisi'],
    },
    password: {
      type: String,
      require: [true, 'Password harus diisi'],
    },
    name: {
      type: String,
      require: [true, 'Password harus diisi'],
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'admin',
    },
  },
  {
    timestamps: true,
  },
);

const user = mongoose.model('User', userSchema);
module.exports = user;
