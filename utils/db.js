import mongoose from 'mongoose';
const connection = {};

async function db() {
  if (connection.isConnected) {
    // Use existing database connection
    console.log('Using existing db connection');
    return;
  }
  // Use new database connection
  const db = await mongoose.connect(process.env.MONGO_SRV, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Database Connected');
  connection.isConnected = db.connections[0].readyState;
}

export default db;
