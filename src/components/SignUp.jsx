import React from 'react';
import {connect} from 'react-redux';
import * as mutations from '../store/mutations';
import {Link} from "react-router-dom";

const SignUpComponent = ({signUpUser}) => {
  return (
    <div className={"card p-2 col-6"}>
      <h2>
        Register your account information
      </h2>
      <form onSubmit={signUpUser}>
        <input type="text" placeholder={"user name"} name={"username"} defaultValue={"yan fu"}
               className="form-control"/>
        <input type="text" placeholder={"password"} name={"password"} defaultValue={""} className="form-control mt-2"/>
        <button type={"submit"} className="form-control mt-2 btn btn-primary">Sign Up</button>
      </form>
      <Link to={"/login"}>Go to login</Link>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  authenticateUser(e) {
    e.preventDefault();
    let username = e.target[`username`].value;
    let password = e.target[`password`].value;
    dispatch(mutations.requestSignUpUser(username, password));
  }
})
export const ConnectedSignUp = connect(mapDispatchToProps)(SignUpComponent);