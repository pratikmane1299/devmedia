const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save', async function () {
  this.password = await this.generatePasswordHash()
});

userSchema.methods.generatePasswordHash = async function () {
  const saltRounds = 10
  return await bcrypt.hash(this.password, saltRounds)
};

userSchema.methods.comparePasswords = async function (password) {
  return await bcrypt.compare(password, this.password)
};

const User = mongoose.model('user', userSchema);

module.exports = User;
