import mongoose from 'mongoose';

const connection: { isConnected?: number } = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  if (!process.env.DATABASE_URL) {
    throw new Error('Invalid/Missing environment variable: "DATABASE_URL"');
  }

  const db = await mongoose.connect(process.env.DATABASE_URL);

  connection.isConnected = db.connections[0]?.readyState;
}

export default dbConnect;
