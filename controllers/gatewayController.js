const {
  createGatewayService,
  getAllGatewaysService,
  findGatewayByIdService,
} = require('../services/GatewayServices');
const {
  findAllPeripheralByIdService,
} = require('../services/PeripheralService');

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
    let gateways = [];
    const getGateways = await getAllGatewaysService();

    if (getGateways.length > 0) {
      for (let i = 0; i < getGateways.length; i++) {
        const peripheral = await findAllPeripheralByIdService(
          getGateways[i]._id
        );
        gateways.push({ peripheral, ...getGateways[i]._doc });
      }
    }

    return res.status(200).json({ gateways });
  } catch (error) {
    return res.status(500).json({ msg: 'Something went wrong' });
  }
};
module.exports.getGatewayById = async (req, res) => {
  const { gatewayId } = req.params;
  try {
    const checkGateway = await findGatewayByIdService(gatewayId);
    if (!checkGateway)
      return res
        .status(404)
        .json({ msg: 'Gateway with this id does not exist' });

    const peripherals = await findAllPeripheralByIdService(gatewayId);

    const gateway = { peripherals, ...checkGateway._doc };

    return res.status(200).json({ gateway });
  } catch (error) {
    return res.status(500).json({ msg: 'Something went wrong' });
  }
};
