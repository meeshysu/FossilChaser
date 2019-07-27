import React from 'react';
import { Link } from 'react-router-dom';
import { Button, FormText, Input, FormGroup, Label } from 'reactstrap';
import authRequests from '../../Data/Auth';

import './Login.scss';

class Login extends React.Component {
  state = {
    user: {
      email: '',
      password: '',
    },
  };

  loginClickEvent = (e) => {
    const { user } = this.state;
    e.preventDefault();
    authRequests
      .loginUser(user)
      .then(() => {
        this.props.history.push('/');
      })
      .catch(error => {
        console.error('there was an error in registering', error);
      });
  };

  emailChange = e => {
    const tempUser = { ...this.state.user };
    tempUser.email = e.target.value;
    this.setState({ user: tempUser });
  };

  passwordChange = e => {
    const tempUser = { ...this.state.user };
    tempUser.password = e.target.value;
    this.setState({ user: tempUser });
  };

  register = (e) => {
    e.preventDefault();
    this.props.signUp(this.state.newParentInformation)
  };

  validateEmail = (e) => {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate } = this.state
    if (emailRex.test(e.target.value)) {
      validate.emailState = 'has-success'
    } else {
      validate.emailState = 'has-danger'
    }
    this.setState({ validate })
  }

  render() {
    const { user } = this.state;
    return (
      <div className="container Login">
        <div className="loginForm" id="login-form">
          <FormGroup className="form-horizontal col-sm-offset-3">
            <Label htmlFor="inputEmail" className=" m-1 control
            -label">
              Email:
              </Label>
            <div className="emailInput mb-2">
              <Input
                type="email"
                className="form-control"
                id="inputEmail"
                placeholder="Email"
                value={user.email}
                onChange={this.emailChange}
              />
              <FormText>Please insert the email for this account.</FormText>
            </div>
            <Label htmlFor="inputPassword" className="col-lg-15 m-1 control-label">
              Password:
              </Label>
            <div className="col-lg-15 mb-2">
              <Input
                type="password"
                className="form-control"
                id="inputPassword"
                placeholder="********"
                value={user.password}
                onChange={this.passwordChange}
              />
              <FormText>Do not share your password with anyone.</FormText>
            </div>
            <div className="col-lg-15">
              <Button className="loginButton mt-2"
                type="submit"
                onClick={this.loginClickEvent}
              >
                Login
                </Button>
            </div>
            <div className="titleReg">Not A Member?</div>
            
            <Link className="register" to="/register"><Button>Register</Button></Link>
          </FormGroup>

        </div>
      </div>
    );
  }
}

export default Login;