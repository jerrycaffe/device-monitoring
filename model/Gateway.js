const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Gateway = new Schema({
  name: { type: String, required: true, unique: true },
  address: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Gateway', Gateway);
