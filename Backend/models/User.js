const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true // Name is mandatory
  },
  email: {
    type: String,
    required: true, // Email is mandatory
    unique: true    // Email must be unique across users
  },
  password: {
    type: String,
    required: true // Hashed password is required
  },
  date: {
    type: Date,
    default: Date.now // Automatically stores the creation date
  }
});

module.exports = mongoose.model('user', UserSchema);

