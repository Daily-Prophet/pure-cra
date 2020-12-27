import React from 'react';
import {connect} from 'react-redux';
import * as mutations from '../store/mutations';

const LoginComponent = ({authenticated, authenticateUser}) => {
  return (
    <div>
      <h2>
        Please Login
      </h2>
      <form onSubmit={authenticateUser}>
        <input type="text" placeholder={"user name"} name={"username"} defaultValue={"Dev"}/>
        <input type="text" placeholder={"password"} name={"password"} defaultValue={""}/>
        <button type={"submit"}>Login</button>
        {authenticated === mutations.NOT_AUTHENTICATED ? <p>Not Authenticated!</p> : null}
      </form>
    </div>
  )
}

const mapStateToProps = ({session}) => ({
  authenticated: session.authenticated
});

const mapDispatchToProps = (dispatch) => ({
  authenticateUser(e) {
    e.preventDefault();
    let username = e.target[`username`].value;
    let password = e.target[`password`].value;
    dispatch(mutations.requestAuthenticateUser(username, password));
  }
})
export const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);