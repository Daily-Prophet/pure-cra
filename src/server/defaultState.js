import md5 from 'md5';

export const defaultState = {
  session: {
    authenticated: false
  },
  users: [{
    id: "U1",
    name: "yan fu",
    passwordHash: md5("123")
  }, {
    id: "U2",
    name: "hao ji",
    passwordHash: md5("666")
  }],
  groups: [{
    name: "To Do",
    id: "G1",
    owner: "U1"
  }, {
    name: "Doing",
    id: "G2",
    owner: "U1"
  }, {
    name: "Done",
    id: "G3",
    owner: "U1"
  }],
  tasks: [{
    name: "Design the SmartReply pipeline",
    id: "T1",
    group: "G2",
    owner: "U1",
    isComplete: false
  }, {
    name: "1-1 with Olga",
    id: "T2",
    group: "G1",
    owner: "U2",
    isComplete: false
  }, {
    name: "Update the OneCert",
    id: "T3",
    group: "G3",
    owner: "U1",
    isComplete: true
  }],
  comments: [{
    owner: "U1",
    id: "C1",
    task: "T1",
    content: "Really Urgent!!!"
  }]
}