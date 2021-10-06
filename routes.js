const express = require('express');
const {
  createGateway,
  getAllGateways,
  getGatewayById,
} = require('./controllers/gatewayController');
const {
  createPeripheral,
  removePeripheral,
} = require('./controllers/peripheralController');
const {
  validateGateway,
  validatePeripheral,
  validatePeripheralParam,
} = require('./validation');

const router = express.Router();

router.get('/api/1.0/gateway', getAllGateways);
router.get('/api/1.0/gateway/:gatewayId', getGatewayById);
router.post('/api/1.0/gateway', validateGateway, createGateway);
router.post(
  '/api/1.0/gateway/peripheral',
  validatePeripheral,
  createPeripheral
);
router.delete(
  '/api/1.0/gateway/peripheral/:peripheralId',
  validatePeripheralParam,
  removePeripheral
);
module.exports = router;
