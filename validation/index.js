const isIp = require('is-ip');

const inValidName = (value) => `${value}`.trim().match(/[^a-zA-Z]/g);
const inValidAddress = (value) => isIp.v4(`${value}`.trim());
const validString = (value) => `${value}`.trim().match(/[^a-zA-Z-_]/g);

module.exports.validateGateway = (req, res, next) => {
  const { name, address } = req.body;

  if (!name || !address)
    return res.status(400).json({
      msg: 'name and address field must be present to create a gateway',
    });

  if (inValidName(name) !== null) {
    return res.status(400).json({
      msg: 'Gateway name must be a human readable string',
    });
  }

  if (!inValidAddress(address))
    return res.status(400).json({
      msg: 'Gateway address must be a valid ipv4 address',
    });
  return next();
};

module.exports.validatePeripheral = (req, res, next) => {
  const { vendor, status, gatewayId } = req.body;
  // vendor
  // status

  if (!vendor || !status || !gatewayId)
    return res
      .status(400)
      .json({ msg: 'Ensure vendor is present and status is properly passed' });

  if (validString(vendor) !== null)
    return res
      .status(400)
      .json({ msg: 'Ensure vendor is present and status is properly passed' });
  return next();
};
