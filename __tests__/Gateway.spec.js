const request = require('supertest');
const app = require('../app');
const Gateway = require('../model/Gateway');
const db = require('../db');

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

const validGatewayDetails = (others) => {
  return {
    name: 'bluetoothMonitor',
    address: '69.162.81.155',
    ...others,
  };
};

const inValidGatewayName = (others) => {
  return {
    name: null,
    address: '69.162.81.155',
    ...others,
  };
};
const inValidGatewayAddress = (others) => {
  return {
    name: 'bluetoothMonitor',
    address: '0.0.0.0',
    ...others,
  };
};
const gatewayUri = '/api/1.0/gateway';
const gatewayIdUri = (id) => {
  return `/api/1.0/gateway/${id}`;
};

describe('validate Gateway endpoints', () => {
  it('return status code of 400 if any of the required field is missing', async () => {
    const response = await request(app)
      .post(gatewayUri)
      .send(inValidGatewayName());
    expect(response.status).toBe(400);
  });
  it('return message of all fields required if any required field is missing', async () => {
    const response = await request(app)
      .post(gatewayUri)
      .send(inValidGatewayName());

    expect(response.body.msg).toBe(
      'name and address field must be present to create a gateway'
    );
  });

  it('return 400 if name field is not a human readable string', async () => {
    const response = await request(app)
      .post(gatewayUri)
      .send(inValidGatewayName({ name: 123 }));

    expect(response.body.msg).toBe(
      'Gateway name must be a human readable string'
    );
  });
  it('return error message if address field is not a valid ipv4 address', async () => {
    const response = await request(app)
      .post(gatewayUri)
      .send(inValidGatewayAddress({ address: 'a.0.0.0' }));

    expect(response.body.msg).toBe(
      'Gateway address must be a valid ipv4 address'
    );
  });
  it('return 400 if address field is not a valid ipv4 address', async () => {
    const response = await request(app)
      .post(gatewayUri)
      .send(inValidGatewayAddress({ address: 'a.0.0.0' }));

    expect(response.status).toBe(400);
  });
  it('return 201 Ok when Gateway is successfully added', async () => {
    const response = await request(app)
      .post(gatewayUri)
      .send(validGatewayDetails());

    expect(response.status).toBe(201);
  });
  it('return message of success', async () => {
    const response = await request(app)
      .post(gatewayUri)
      .send(validGatewayDetails());

    expect(response.body.message).toBe('Gateway successfully created');
  });
  it('saves the user to the database', async () => {
    await request(app).post(gatewayUri).send(validGatewayDetails());
    const gateway = await Gateway.find();
    expect(gateway.length).toBe(1);
  });
});

describe('list and modify gateway endpoints', () => {
  it('returns the list of gateways in the db', async () => {
    await request(app).post(gatewayUri).send(validGatewayDetails());
    await request(app)
      .post(gatewayUri)
      .send(validGatewayDetails({ address: '0.0.0.0', name: 'infraRed' }));
    const response = await request(app).get(gatewayUri);
    expect(response.status).toBe(200);
    expect(response.body.gateways.length).toBe(2);
  });
  it('returns 404  and error message if gateway cannot be found', async () => {
    const response = await request(app).get(
      gatewayIdUri('615c8ef0256e9962b004c807')
    );

    expect(response.status).toBe(404);
    expect(response.body.msg).toBe('Gateway with this id does not exist');
  });
  it('returns gateway', async () => {
    await request(app).post(gatewayUri).send(validGatewayDetails());
    const gateway = await Gateway.findOne();

    const response = await request(app).get(gatewayIdUri(gateway._id));

    expect(response.status).toBe(200);
    expect(gateway).toHaveProperty('address', gateway.address);
    expect(gateway).toHaveProperty('name', gateway.name);
  });
});
