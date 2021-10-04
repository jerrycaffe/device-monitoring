const request = require('supertest');
const app = require('../app');
const Gateway = require('../model/Gateway');
const db = require('../db');

beforeAll(() => {
  return db.connect();
});
afterEach(() => {
  return db.clearDatabase();
});
afterAll(() => {
  return db.closeDatabase();
});

describe('Gateway endpoints', () => {
  // test status
  // test message
  // test invlalid input
  // test valid input
  it('return 201 Ok when Gateway is successfully added', async () => {
    const response = await request(app).post('/api/1.0/gateway').send({
      name: 'bluetoothMonitor',
      address: '69.162.81.155',
    });

    expect(response.status).toBe(201);
  });
  it('return message of success', async () => {
    const response = await request(app).post('/api/1.0/gateway').send({
      name: 'bluetoothMonitor',
      address: '69.162.81.155',
    });

    expect(response.body.message).toBe('Gateway successfully created');
  });
  it('saves the user to the database', async () => {
    await request(app).post('/api/1.0/gateway').send({
      name: 'bluetoothMonitor',
      address: '69.162.81.155',
    });

    const gateway = await Gateway.find();

    expect(gateway.length).toBe(1);
  });
});
