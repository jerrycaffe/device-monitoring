const PeripheralModel = require('./model/Peripheral');
module.exports.insertManyGateway = async (id) => {
  return await PeripheralModel.insertMany([
    { gatewayId: id, vendor: 'fake1', status: 'online' },
    {
      gatewayId: id,
      vendor: 'fake2',
      status: 'offline',
    },
    {
      gatewayId: id,
      vendor: 'fake3',
      status: 'online',
    },
    {
      gatewayId: id,
      vendor: 'fake4',
      status: 'online',
    },
    {
      gatewayId: id,
      vendor: 'fake5',
      status: 'offline',
    },
    {
      gatewayId: id,
      vendor: 'fake6',
      status: 'offline',
    },
    {
      gatewayId: id,
      vendor: 'fake7',
      status: 'offline',
    },
    {
      gatewayId: id,
      vendor: 'fake8',
      status: 'offline',
    },
    {
      gatewayId: id,
      vendor: 'fake9',
      status: 'offline',
    },
    {
      gatewayId: id,
      vendor: 'fake10',
      status: 'offline',
    },
    {
      gatewayId: id,
      vendor: 'fake11',
      status: 'offline',
    },
  ]);
};
