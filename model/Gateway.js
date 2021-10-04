const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Gateway = new Schema({
  name: { type: String, required: true },
  address: String,
});

module.exports = mongoose.model('Gateway', Gateway);
