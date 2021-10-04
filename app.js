const express = require('express');
const Gateway = require('./model/Gateway');
const { createGateway } = require('./services/GatewayServices');

const app = express();

app.use(express.json());

app.post('/api/1.0/gateway', async (req, res) => {
  try {
    const gateway = await createGateway(req.body);

    res.status(201).json({ message: 'Gateway successfully created', gateway });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});
module.exports = app;
