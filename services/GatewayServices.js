const ObjectId = require('mongodb').ObjectId;
const GatewayModel = require('../model/Gateway');

module.exports.createGatewayService = async (value) => {
  await GatewayModel.create(value);
};

module.exports.findGatewayByIdService = async (id) => {
  return await GatewayModel.findById(new ObjectId(id));
};
