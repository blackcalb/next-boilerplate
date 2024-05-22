/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-mutable-exports */
import { MongoClient, ServerApiVersion } from 'mongodb';

if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PSWD) {
  throw new Error('Invalid/Missing environment variable: "DB_*"');
}

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PSWD}@playground.occeeja.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=playground`;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
