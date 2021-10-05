const express = require('express');
const { createGateway } = require('./controllers/gatewayController');
const { createPeripheral } = require('./controllers/peripheralController');
const { validateGateway, validatePeripheral } = require('./validation');

const router = express.Router();

router.post('/api/1.0/gateway', validateGateway, createGateway);
router.post(
  '/api/1.0/gateway/peripheral',
  validatePeripheral,
  createPeripheral
);
module.exports = router;
