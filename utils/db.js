import mongoose from 'mongoose';
const connection = {};

const connection =
  'mongodb://ajak:ajak123@cluster0-shard-00-00-xpsoz.mongodb.net:27017,cluster0-shard-00-01-xpsoz.mongodb.net:27017,cluster0-shard-00-02-xpsoz.mongodb.net:27017/ppm?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';

async function db() {
  if (connection.isConnected) {
    // Use existing database connection
    console.log('Using existing db connection');
    return;
  }
  // Use new database connection
  const db = await mongoose.connect(connection, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Database Connected');
  connection.isConnected = db.connections[0].readyState;
}

export default db;
