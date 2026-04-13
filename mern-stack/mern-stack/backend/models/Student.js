const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  course: {
    type: String,
    required: true,
    trim: true
  },
  skills: {
    type: String,
    trim: true
  },
  about: {
    type: String,
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);
