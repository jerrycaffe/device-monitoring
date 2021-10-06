const request = require('supertest');

const app = require('../app');

// no more that 10 peripheral devices are allowed for a gateway
// The service must also offer an operation for displaying information about all stored gateways (and their devices)
// and an operation for displaying details for a single gateway.
// Finally, it must be possible to add and remove a device from a gateway.

const db = require('../database/testDb');
const Gateway = require('../model/Gateway');
const { insertManyPeripheral } = require('../dummyData');

// eslint-disable-next-line no-undef
beforeAll(() => {
  return db.connect();
});
// eslint-disable-next-line no-undef
afterEach(() => {
  return db.clearDatabase();
});
// eslint-disable-next-line no-undef
afterAll(() => {
  return db.closeDatabase();
});
const validGatewayDetails = () => {
  return {
    name: 'bluetoothMonitor',
    address: '69.162.81.155',
  };
};
const peripheralUri = '/api/1.0/gateway/peripheral';
const peripheralIdUri = (id) => peripheralUri + '/' + id;
const gatewayUri = '/api/1.0/gateway';
const validPeripheralData = (other) => {
  return {
    gatewayId: '615c3d2b9a5e9f953ab6bf09',
    vendor: 'musala',
    status: 'online',
    ...other,
  };
};

describe('Peripheral devices to be tested here', () => {
  it('returns 400 if any of the required field is missing', async () => {
    const response = await request(app).post(peripheralUri).send({
      vendor: null,
      status: null,
    });

    expect(response.status).toBe(400);
  });
  it('returns error messge  if any of the required field is missing', async () => {
    const response = await request(app).post(peripheralUri).send({
      vendor: null,
      status: null,
    });

    expect(response.body.msg).toBe(
      'Ensure vendor is present and status is properly passed'
    );
  });
  it('returns status code of 400', async () => {
    const response = await request(app).post(peripheralUri).send({
      vendor: '-!=',
      status: 'online',
    });

    expect(response.status).toBe(400);
  });
  it('returns error messge  if vendor is not a valid string', async () => {
    const response = await request(app).post(peripheralUri).send({
      vendor: 123,
      status: 'online',
    });

    expect(response.body.msg).toBe(
      'Ensure vendor is present and status is properly passed'
    );
  });
  it('returns 404 and erro message if a user try creating peripheral with an invalid gatewayId', async () => {
    await request(app).post(gatewayUri).send(validGatewayDetails());

    const response = await request(app)
      .post(peripheralUri)
      .send(validPeripheralData());

    expect(response.status).toBe(404);

    expect(response.body.msg).toBe(
      'You cannot create a peripheral for a gateway that does not exist'
    );
  });
  it('returns 201 when peripheral is successfully created', async () => {
    await request(app).post(gatewayUri).send(validGatewayDetails());

    const gateway = await Gateway.findOne();

    const response = await request(app)
      .post(peripheralUri)
      .send(validPeripheralData({ gatewayId: gateway._id }));

    expect(response.status).toBe(201);

    expect(response.body.msg).toBe('Peripheral Device successfully created');
  });

  it('returns 403 and error message when trying to add peripheral devices after the length is 10', async () => {
    await request(app).post(gatewayUri).send(validGatewayDetails());

    const gateway = await Gateway.findOne();

    insertManyPeripheral(gateway._id);

    const response = await request(app).post(peripheralUri).send({
      gatewayId: gateway._id,
      vendor: 'test',
      status: 'online',
    });

    expect(response.status).toBe(403);
    expect(response.body.msg).toBe('A gateway can only accommodate 10 devices');
  });
  it('returns status of 403 and error message when request param is missing while trying to delete peripheral', async () => {
    await request(app).post(gatewayUri).send(validGatewayDetails());

    const gateway = await Gateway.findOne();
    await request(app).post(peripheralUri).send({
      gatewayId: gateway._id,
      vendor: 'test',
      status: 'online',
    });

    const response = await request(app).delete(peripheralIdUri());

    expect(response.status).toBe(403);

    expect(response.body.msg).toBe(
      'Ensure peripheral Id is included before you can proceed with this request'
    );
  });
  it('returns status of 200 and success message when a device is removed from a gateway', async () => {
    await request(app).post(gatewayUri).send(validGatewayDetails());

    const gateway = await Gateway.findOne();
    await request(app).post(peripheralUri).send({
      gatewayId: gateway._id,
      vendor: 'test',
      status: 'online',
    });

    const response = await request(app).delete(peripheralIdUri(gateway._id));

    expect(response.status).toBe(200);

    expect(response.body.msg).toBe(
      'You have successfully removed this device from it gateway'
    );
  });
});
