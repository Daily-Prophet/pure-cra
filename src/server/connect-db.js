import pkg from 'mongodb';
const {MongoClient} = pkg;

let db = null;
const cloudUrl = "mongodb+srv://young:Fyz19933122@cluster0.zqyq4.mongodb.net/tasksDB?retryWrites=true&w=majority";
const localUrl = "mongodb://localhost:27017/tasksDB";
const url = process.env.NODE_ENV === 'production' ? cloudUrl : localUrl;

export async function connectDB() {
  let client = await MongoClient.connect(url, {useNewUrlParser: true});
  db = client.db();
  return db;
};
