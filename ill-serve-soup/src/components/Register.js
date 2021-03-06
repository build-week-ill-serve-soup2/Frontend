import React from "react";
import { connect } from "react-redux";

import { register } from "../actions";

class Register extends React.Component {
  state = {
  creds: {
    username: "",
    password: ""
  },
 }
  render() {
    return (
      <div className="login-bg">
        <div className="login-wrapper">
          {this.props.error 
              ? (
                <div className="axios-error">
                  Error Signing Up
                </div> 
              ) 
              : (
                <div className="axios-alert">
                  Enter Your Information
                </div>
              ) 
            }
          <div className="form-button-wrapper">
            <form className="login-form">
              <div className="input-wrapper">
                <div>
                  <input
                    placeholder="username"
                    name="username"
                    value={this.state.creds.username}
                    onChange={this.handleChanges}
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="password"
                    name="password"
                    value={this.state.creds.password}
                    onChange={this.handleChanges}
                    required
                  />
                </div>
              </div>
              <div className="login-div" onClick={this.register}>
                {(this.props.registering || this.props.loggingIn) ? <div>Building Your Kitchen...</div> : <p>Sign Up</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  handleChanges = e => {
    e.preventDefault();
    this.setState({
      creds: {
        ...this.state.creds,
        [e.target.name]: e.target.value
      }
    });
  };

  register = () => {
    this.props.register(this.props.history, {
        username: this.state.creds.username,
        password: this.state.creds.password
    })
  };
}

const mapStateToProps = ({ registering, loggingIn, error }) => ({
  registering,
  loggingIn,
  error
});

export default connect(
  mapStateToProps,
  { register }
)(Register);