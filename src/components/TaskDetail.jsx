import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import * as mutations from '../store/mutations';

const TaskDetail = ({
                      id,
                      comments,
                      groups,
                      task,
                      isComplete,
                      setTaskCompletion,
                      setTaskName,
                      setTaskGroup,
                    }) => (
  <div className="card p-3 col-6">
    <h3>
      <input onChange={setTaskName} value={task.name} className="form-control form-control-lg"/>
    </h3>
    <div>
      <button onClick={() => setTaskCompletion(id, !isComplete, isComplete ? "G1" : "G3")} className="btn btn-primary">
        {isComplete ? "Reopen" : "complete"}
      </button>
    </div>
    <div className="form-inline mt-3">
      <select onChange={setTaskGroup} value={task.group} className="form-control">
        {groups.map(group =>
          <option
            key={group.id}
            value={group.id}
          >
            {group.name}
          </option>)}
      </select>
    </div>
    <div>
      <Link to="/dashboard">
        <button className="btn btn-primary mt-2">Done</button>
      </Link>
    </div>
  </div>
);
const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.id;
  let task = state.tasks.find(task => task.id === id);
  let groups = state.groups;

  return {
    id,
    task,
    groups,
    isComplete: task.isComplete
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  let id = ownProps.match.params.id;
  return {
    setTaskCompletion(id, isComplete, taskGroup) {
      dispatch(mutations.setTaskCompletion(id, isComplete, taskGroup));
    },
    setTaskName(e) {
      dispatch(mutations.setTaskName(id, e.target.value));
    },
    setTaskGroup(e) {
      dispatch(mutations.setTaskGroup(id, e.target.value));
    }
  };
};

export const ConnectedTaskDetail = connect(mapStateToProps, mapDispatchToProps)(TaskDetail);
