const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'A name is required'],
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'An email is required'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'A password is required'],
  },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
