const GatewayModel = require('../model/Gateway');

module.exports.createGatewayService = async (value) => {
  await GatewayModel.create(value);
};
