const { createGatewayService } = require('../services/GatewayServices');

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
