const mongoose = require('mongoose');

const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    title: {
      type: String,
      require: [true, 'Judul Project harus diisi'],
    },
    year: {
      type: String,
      require: [true, 'Tahun Project harus diisi'],
    },
    description: {
      type: String,
      require: [true, 'Deskripsi Project harus diisi'],
    },
    client: {
      type: String,
      require: [true, 'Client  Project harus diisi'],
    },
    urlProject: {
      type: String,
      require: [true, 'Link Project  Project harus diisi'],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    teams: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Team',
      },
    ],
    thumbnail: {
      type: String,
    },
  },
  { timestamps: true },
);
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
