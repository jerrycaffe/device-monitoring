const { findGatewayByIdService } = require('../services/GatewayServices');
const { createPeripheralService } = require('../services/PeripheralService');

module.exports.createPeripheral = async (req, res) => {
  try {
    // eslint-disable-next-line no-undef
    const peripheral = await createPeripheralService(req.body);
    const isGatewayExist = await findGatewayByIdService(req.body.gatewayId);

    if (isGatewayExist === null)
      return res.status(404).json({
        msg: 'You cannot create a peripheral for a device that does not exist',
      });
    return res
      .status(201)
      .json({ msg: 'Peripheral Device successfully created', peripheral });
  } catch (error) {
    return res.status(500).json({ msg: 'Something went wrong' });
  }
};
