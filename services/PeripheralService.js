const PeripheralModel = require('../model/Peripheral');

module.exports.createPeripheralService = async (value) => {
  await PeripheralModel.create(value);
};

module.exports.findAllPeripheralByIdService = async (gatewayId) => {
  return await PeripheralModel.find({ gatewayId });
};
module.exports.removePeripheralService = async (peripheralId) => {
  return await PeripheralModel.findByIdAndDelete(peripheralId);
};
