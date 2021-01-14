import {v4 as uuid} from 'uuid';
import md5 from 'md5';
import {connectDB} from "./connect-db.js";

const authenticationTokens = [];

async function assembleUserState(user) {
  let db = await connectDB();

  let tasks = await db.collection(`tasks`).find({owner: user.id}).toArray();
  let groups = await db.collection(`groups`).find({owner: user.id}).toArray();
  let users = [await db.collection(`users`).findOne({id:user.id})];
  return {
    users,
    tasks,
    groups,
    session: {authenticated: "AUTHENTICATED", id: user.id}
  }
}

export const authenticationRoute = app => {
  app.post('/authenticate', async (req, res) => {
    try {
      let {username, password} = req.body;
      let db = await connectDB();
      let collection = db.collection(`users`);
      let user = await collection.findOne({name: username});

      if (!user) {
        return res.status(500).send("User not found");
      }

      let passwordCorrect = md5(password) === user.passwordHash;

      if (!passwordCorrect) {
        return res.status(500).send("Password incorrect");
      }

      let token = uuid();
      authenticationTokens.push({
        token,
        userID: user.id
      })

      let state = await assembleUserState(user);
      res.send({token, state});
    } catch (e) {
      return res.status(500).send(req);
    }
  })
}

export const signUpRoute = app => {
  app.post('/signup', async (req, res) => {
    try {
      let {username, password} = req.body;
      let db = await connectDB();
      let collection = db.collection(`users`);
      let user = await collection.findOne({name: username});

      if (!user) {
        return res.status(500).send("User has registered!");
      }
      await collection.insertOne({id:uuid(), name: username, passwordHash:md5(password) });

      let token = uuid();

      let state = await assembleUserState(user);
      res.send({token, state});
    } catch (e) {
      return res.status(500).send(req);
    }
  })
}
