import {
  take,
  put,
  fork,
  all
} from 'redux-saga/effects';
import * as mutations from './mutations';
import {v4 as uuid} from 'uuid';
import axios from 'axios';
import {history} from './history';
import {SET_TASK_COMPLETION} from "./mutations";

const url = process.env.NODE_ENV === 'production' ? `` : "http://localhost:8888";

export function* taskCreationSaga() {
  while (true) {
    const entity = yield take(mutations.REQUEST_TASK_CREATION);
    const {groupID} = entity;
    const ownerID = `U1`;
    const taskID = uuid();
    yield put(mutations.createTask(taskID, groupID, ownerID));
    const {res} = yield axios.post(url + '/task/new', {
      task: {
        id: taskID,
        group: groupID,
        owner: ownerID,
        isComplete: false,
        name: "New task"
      }
    });
  }
}

export function* taskModificationSaga() {
  while (true) {
    const updateAction = yield take([
      mutations.SET_TASK_GROUP,
      mutations.SET_TASK_NAME,
      mutations.SET_TASK_COMPLETION
    ]);
    const {res} = yield axios.post(url + '/task/update', {
      task: {
        id: updateAction.taskID,
        group: updateAction.taskGroup,
        name: updateAction.taskName,
        isComplete: updateAction.isComplete
      }
    })
  }
}

export function* userAuthenticationSage() {
  while (true) {
    const {username, password} = yield take(mutations.REQUEST_AUTH_USER);
    try {
      const {data} = yield axios.post(url + `/authenticate`, {username, password});
      yield put(mutations.setState(data.state));
      history.push(`/dashboard`);
      if (!data) {
        throw new Error();
      }
    } catch (e) {
      yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED));
    }

  }
}

export function* rootSaga() {
  yield all([
    fork(taskCreationSaga),
    fork(taskModificationSaga),
    fork(userAuthenticationSage)
  ])
}