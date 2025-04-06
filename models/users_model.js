const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  isApproved: { type: Boolean, default: false },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
});
module.exports = mongoose.model('User', userSchema);