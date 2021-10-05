const express = require('express');
// const Gateway = require('./model/Gateway');
const routes = require('./routes');

// const { createGateway } = require('./services/GatewayServices');

const app = express();

app.use(express.json());
app.use(routes);
// app.post('/api/1.0/gateway');
module.exports = app;
