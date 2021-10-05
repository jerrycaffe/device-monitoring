const { createPeripheralService } = require('../services/PeripheralService');

module.exports.createPeripheral = async (req, res) => {
  try {
    // eslint-disable-next-line no-undef
    const peripheral = await createPeripheralService(req.body);

    return res
      .status(201)
      .json({ msg: 'Peripheral Device successfully created', peripheral });
  } catch (error) {
    return res.status(500).json({ msg: 'Something went wrong' });
  }
};
