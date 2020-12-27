import {addNewTask, updateTask} from './server.js';

addNewTask({
  name: "My Express test task",
  id: "888"
})

updateTask({
  name: "My Express test task been UPDATED!",
  id: "666"
})