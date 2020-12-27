export const REQUEST_TASK_CREATION = `REQUEST_TASK_CREATION`;
export const CREATE_TASK = `CREATE_TASK`;
export const SET_TASK_COMPLETION = `SET_TASK_COMPLETION`;
export const SET_TASK_NAME = `SET_TASK_NAME`;
export const SET_TASK_GROUP = `SET_TASK_GROUP`;
export const REQUEST_AUTH_USER = `REQUEST_AUTH_USER`;
export const PROCESSING_AUTH_USER = `PROCESSING_AUTH_USER`;
export const AUTHENTICATING = `AUTHENTICATING`;
export const AUTHENTICATED = `AUTHENTICATED`;
export const NOT_AUTHENTICATED = `NOT_AUTHENTICATED`;
export const SET_STATE = `SET_STATE`;

//action
export const requestTaskCreation = (groupID) => ({
  type: REQUEST_TASK_CREATION,
  groupID
});

export const createTask = (taskID, groupID, ownerID) => ({
  type: CREATE_TASK,
  taskID,
  groupID,
  ownerID
});

export const setTaskCompletion = (taskID, isComplete) => ({
  type: SET_TASK_COMPLETION,
  taskID,
  isComplete
})

export const setTaskName = (taskID, taskName) => ({
  type: SET_TASK_NAME,
  taskID,
  taskName
})

export const setTaskGroup = (taskID, taskGroup) => ({
  type: SET_TASK_GROUP,
  taskID,
  taskGroup
})

export const requestAuthenticateUser = (username, password) => ({
  type: REQUEST_AUTH_USER,
  username,
  password
})

export const processAuthenticateUser = (status = AUTHENTICATING, session = null) => ({
  type: PROCESSING_AUTH_USER,
  session,
  authenticated: status
})

export const setState = (state = {}) => ({
  type:SET_STATE,
  state
})