const mongoose = require('mongoose');

const infoSchema = mongoose.Schema({
  infoText1: { type: String, required: true },
  infoText2: { type: String, required: true },
  from: { type: String, required: true }
});

module.exports = mongoose.model('Info', infoSchema);

