const request = require('supertest');
const app = require('../app');

it('return 200 Ok when Peripheral is successfully added', () => {
  request(app).post('/api/1.0/peripherals').send({
    vender: '',
    dateCreated: '',
    status: 'online',
  });
});
