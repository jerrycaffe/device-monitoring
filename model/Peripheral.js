const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Peripheral = new Schema({
  vendor: { type: String, required: true, unique: true },
  dateCreated: { type: Date, default: Date.now },
  status: { type: String, enum: ['online', 'offline'], default: 'online' },
  gatewayId: { type: ObjectId, ref: 'Gateway' },
});
Peripheral.set('autoIndex', true);
module.exports = mongoose.model('Peripheral', Peripheral);
