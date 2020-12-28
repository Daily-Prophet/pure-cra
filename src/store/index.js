import {applyMiddleware, createStore, combineReducers} from "redux";
import {defaultState} from "../server/defaultState";
import {createLogger} from "redux-logger/src";
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from './sagas';

import * as mutations from './mutations';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  //reducer 定义了具体如何更新action,saga中间件在redux中提供了监控机制
  combineReducers({
    session(userSession = defaultState.session || {}, action) {
      const {type, authenticated, session} = action;
      switch (type) {
        case mutations.REQUEST_AUTH_USER:
          return {...userSession, authenticated: mutations.AUTHENTICATING};
        case mutations.PROCESSING_AUTH_USER:
          return {...userSession, authenticated};
        case mutations.SET_STATE:
          return {...userSession, id: action.state.session.id};
        default:
          return userSession;
      }
    },
    tasks(tasks = defaultState.tasks, action) {
      switch (action.type) {
        case mutations.SET_STATE:
          return action.state.tasks;
        case mutations.CREATE_TASK:
          return [...tasks, {
            id: action.taskID,
            name: "New Task",
            group: action.groupID,
            owner: action.ownerID,
            isComplete: false
          }]
        case mutations.SET_TASK_COMPLETION:
          return tasks.map(task => (
            task.id === action.taskID ?
              {...task, isComplete: action.isComplete, group: action.taskGroup}
              : task
          ));
        case mutations.SET_TASK_NAME:
          return tasks.map(task => (
            task.id === action.taskID ? {...task, name: action.taskName} : task
          ));
        case mutations.SET_TASK_GROUP:
          return tasks.map(task => (
            task.id === action.taskID ? {...task, group: action.taskGroup} : task
          ));
        default:
          return tasks;
      }
      return tasks;
    },
    comments(comments = defaultState.comments) {
      return comments;
    },
    groups(groups = defaultState.groups, action) {
      switch (action.type) {
        case mutations.SET_STATE:
          return action.state.groups;
        default:
          return groups;
      }
    },
    users(users = defaultState.users, action) {
      switch (action.type) {
        case mutations.SET_STATE:
          return action.state.users;
        default:
          return users;
      }
    }
  }),
  applyMiddleware(createLogger(), sagaMiddleware)
  )
;

//run: 开始注册运行saga，saga中在监控action,再根据监控的action去操作创建出新的action
sagaMiddleware.run(rootSaga);
