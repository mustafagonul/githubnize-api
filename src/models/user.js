const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose.Schema;


const userSchema = new Schema(({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
  },
}
));

userSchema.methods.comparePassword = function comparePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('GithubnizeUser', userSchema);
