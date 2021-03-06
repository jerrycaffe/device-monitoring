const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod = {};
module.exports.connect = async () => {
  mongod = await MongoMemoryServer.create();

  const uri = mongod.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  await mongoose.connect(uri, mongooseOpts);
};

module.exports.closeDatabase = async () => {
  await mongoose.connection.dropDatabase();

  await mongoose.connection.close();
  await mongod.stop();
};

module.exports.clearDatabase = async () => {
  const collection = mongoose.connection.collections;
  for (const key in collection) await collection[key].deleteMany();
};
