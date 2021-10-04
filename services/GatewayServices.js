const GatewayModel = require('../model/Gateway');

module.exports.createGateway = async (value) => {
  await GatewayModel.create(value);
};
