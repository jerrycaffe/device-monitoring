const PeripheralModel = require('../model/Peripheral');

module.exports.createPeripheralService = async (value) => {
  return await PeripheralModel.create(value);
};

module.exports.findAllPeripheralByIdService = async (gatewayId) => {
  return await PeripheralModel.find({ gatewayId });
};
module.exports.removePeripheralService = async (peripheralId) => {
  return await PeripheralModel.findByIdAndDelete(peripheralId);
};

module.exports.findPeripheralByIdService = async (peripheralId) => {
  return await PeripheralModel.find({ _id: peripheralId });
};
