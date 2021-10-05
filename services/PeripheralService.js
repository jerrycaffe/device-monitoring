const PeripheralModel = require('../model/Peripheral');

module.exports.createPeripheralService = async (value) => {
  await PeripheralModel.create(value);
};
