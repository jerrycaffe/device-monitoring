const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Peripheral = new Schema({
  UID: { String, required },
  vendor: String,
  dateCreated: Date,
  status: { type: String, enum: ['online', 'offline'], default: 'online' },
  gateway: { type: ObjectId, ref: 'Gateway' },
});
Peripheral.set('autoIndex', true);
module.exports = mongoose.model('Peripheral', Peripheral);
