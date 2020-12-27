import {defaultState} from './defaultState.js';
import {connectDB} from './connect-db.js';

async function initializeDB() {
  let db = await connectDB();
  let user = await db.collection(`users`).findOne({id: "U1"});
  if (!user) {
    for (let collectionName in defaultState) {
      if (collectionName !== 'session') {
        let collection = db.collection(collectionName);
        await collection.insertMany(defaultState[collectionName]);
      }
    }
  }
};

initializeDB();