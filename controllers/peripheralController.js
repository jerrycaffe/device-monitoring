const { findGatewayByIdService } = require('../services/GatewayServices');
const {
  createPeripheralService,
  findAllPeripheralByIdService,
  removePeripheralService,
  findPeripheralByIdService,
} = require('../services/PeripheralService');

module.exports.createPeripheral = async (req, res) => {
  try {
    // eslint-disable-next-line no-undef
    const isGatewayExist = await findGatewayByIdService(req.body.gatewayId);

    if (isGatewayExist === null)
      return res.status(404).json({
        msg: 'You cannot create a peripheral for a gateway that does not exist',
      });

    const allPeriPheral = await findAllPeripheralByIdService(
      req.body.gatewayId
    );

    if (allPeriPheral.length > 10)
      return res
        .status(403)
        .json({ msg: 'A gateway can only accommodate 10 devices' });

    const vendor =
      allPeriPheral.length > 0
        ? allPeriPheral.filter((v) => v.vendor === req.body.vendor).length
        : 0;

    if (vendor)
      return res
        .status(403)
        .json({ msg: 'this vendor has been associated to a gateway' });
    const peripheral = await createPeripheralService(req.body);

    return res
      .status(201)
      .json({ msg: 'Peripheral Device successfully created', peripheral });
  } catch (error) {
    return res.status(500).json({ msg: 'Something went wrong' });
  }
};

module.exports.removePeripheral = async (req, res) => {
  try {
    const { peripheralId } = req.params;
    const peripheralExist = await findPeripheralByIdService(peripheralId);

    if (peripheralExist.length === 0)
      return res
        .status(403)
        .json({ msg: 'You cannot remove a that does not exist' });

    await removePeripheralService(peripheralId);

    return res.status(200).json({
      msg: 'You have successfully removed this device from it gateway',
    });
  } catch (error) {
    return res.status(500).json({ msg: 'Something went wrong' });
  }
};
