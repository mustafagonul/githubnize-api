const mongoose = require('mongoose');


const userSchema = new mongoose.Schema(({
  login: {
    type: String,
    trim: true,
    required: true,
  },
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    // required: true,
  },
}
));


module.exports = mongoose.model('GithubnizeUser', userSchema);
