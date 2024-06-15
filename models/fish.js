const mongoose = require('mongoose');

const fishSchema = new mongoose.Schema({
  name_species: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: false,
  },
  picture: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  ecosystem: {
    type: String,
    required: false,
  },
  feeding: {
    type: String,
    required: false,
  },
  size: {
    type: String,
    required: false,
  },
  tank_size: {
    type: String,
    required: false,
  },
  velocity: {
    type: String,
    required: false,
  },
  origin: {
    type: String,
    required: false,
  },
  social_behavior: {
    type: String,
    required: false,
  },
});

const Fish = mongoose.model('Fish', fishSchema);

module.exports = Fish;
