const {
  createGatewayService,
  getAllGatewaysService,
  findGatewayByIdService,
} = require('../services/GatewayServices');

module.exports.createGateway = async (req, res) => {
  try {
    // eslint-disable-next-line no-undef
    const gateway = await createGatewayService(req.body);

    return res
      .status(201)
      .json({ message: 'Gateway successfully created', gateway });
  } catch (error) {
    return res.status(500).json({ msg: 'Something went wrong' });
  }
};

module.exports.getAllGateways = async (req, res) => {
  try {
    const gateways = await getAllGatewaysService();
    return res.status(200).json({ gateways });
  } catch (error) {
    return res.status(500).json({ msg: 'Something went wrong' });
  }
};
module.exports.getGatewayById = async (req, res) => {
  try {
    const gateway = await findGatewayByIdService(req.params.gatewayId);
    if (!gateway)
      return res
        .status(404)
        .json({ msg: 'Gateway with this id does not exist' });
    return res.status(200).json({ gateway });
  } catch (error) {
    return res.status(500).json({ msg: 'Something went wrong' });
  }
};
