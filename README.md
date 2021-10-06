# MUSALA - SOFT (Device Monitoring)

This project is managing gateways - master devices that control multiple peripheral devices.

## Project setup

### clone repository

git clone https://github.com/jerrycaffe/device-monitoring.git

## API hosted on heroku

### Get the list of all gateways and devices attached to them

GET: `https://musala-soft.herokuapp.com/api/1.0/gateway`

### Create a gateway with valid ipv4 address and human readable name

POST: `https://musala-soft.herokuapp.com/api/1.0/gateway`

### Get a gateway with the list of all devices attached to it

GET: `https://musala-soft.herokuapp.com/api/1.0/gateway/gatewayId`

### Create a peripheral for a valid gateway provided devices under this gateway is less than 10 otherwise error is thrown

POST:`https://musala-soft.herokuapp.com/api/1.0/gateway/peripheral`

### Remove a peripheral from a valid gateway

DELETE:`https://musala-soft.herokuapp.com/api/1.0/gateway/peripheral/peripheralId`

## Test locally

### install dependencies

npm install

### run test

npm test

### running application locally requires you add mongodb connection uri see example.env for the required pattern

### start application locally

npm run dev

GET: `http://localhost:3000/api/1.0/gateway`

### Create a gateway with valid ipv4 address and human readable name

POST: `http://localhost:3000/api/1.0/gateway`

### Get a gateway with the list of all devices attached to it

GET: `http://localhost:3000/api/1.0/gateway/gatewayId`

### Create a peripheral for a valid gateway provided devices under this gateway is less than 10 otherwise error is thrown

POST:`http://localhost:3000/api/1.0/gateway/peripheral`

### Remove a peripheral from a valid gateway

DELETE:`http://localhost:3000/api/1.0/gateway/peripheral/peripheralId`
