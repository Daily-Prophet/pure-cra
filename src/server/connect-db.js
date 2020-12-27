import pkg from 'mongodb';
const {MongoClient} = pkg;

const url = process.env.MONGODB_URL || 'mongodb://localhost:27017/tasksDB';
let db = null;

export async function connectDB() {
  let client = await MongoClient.connect(url, {useNewUrlParser: true});
  db = client.db();
  return db;
};
