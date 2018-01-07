const mongoose = require('mongoose');


const repoSchema = new mongoose.Schema(({
  login: {
    type: String,
    trim: true,
    required: true,
  },
  owner: {
    type: String,
    trim: true,
    required: true,
  },
  repo: {
    type: String,
    trim: true,
    required: true,
  },
  slug: {
    type: String,
    index: true,
    required: true,
  },
}
));


repoSchema.index({
  login: 1,
  owner: 1,
  repo: 1,
  slug: 1,
}, { unique: true });


module.exports = mongoose.model('GithubnizeRepo', repoSchema);
