const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      unique: true,
      required: [true, 'email cannot be empty']
    },
    password: {
      type: String,
      required: [true, 'password cannot be empty']
    },
    creation_date: {
      type: String
    }
})

module.exports = mongoose.model('User', userSchema);