const mongoose = require('mongoose');

const { Schema } = mongoose;

const teamSchema = new Schema(
  {
    name: {
      type: String,
      require: [true, 'Nama harus diisi'],
    },

    role: {
      type: Schema.Types.ObjectId,
      ref: 'Role',
    },
    image: {
      type: String,
    },
  },
  { timestamps: true },
);
const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
