import React from 'react';
import { Link } from 'react-router-dom';
import { Button, FormText, Input, FormGroup, Label } from 'reactstrap';
import authRequests from '../../Data/Auth';
import postUser from '../../Data/UserRequest';
import firebase from 'firebase';

import './Register.scss';

const customerInformation = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  date: '',
}
class Register extends React.Component {
  state = {
    newCustomerInformation: customerInformation,
  };

  signUp = (newCustomerInformation) => {
    firebase.auth().createUserWithEmailAndPassword(newCustomerInformation.email, newCustomerInformation.password).then((res) => {
      newCustomerInformation.uid = authRequests.getUid();
      const customerInformation = {
        firstName: newCustomerInformation.firstName,
        lastName: newCustomerInformation.lastName,
        email: newCustomerInformation.email,
        customerUid: newCustomerInformation.uid
      }
      postUser.getUserProfile(customerInformation);
      this.props.history.push('/');
    }).catch(err => console.error('there was an error with auth', err));
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempInfo = { ...this.state.newCustomerInformation };
    tempInfo[name] = e.target.value;
    this.setState({ newCustomerInformation: tempInfo });
  }

  emailChange = e => {
    this.formFieldStringState('name', e);
  };

  firstNameChange = e => {
    this.formFieldStringState('firstName', e);
  };

  lastNameChange = e => {
    this.formFieldStringState('lastName', e);
  };

  dateChange = e => {
    this.formFieldStringState('date', e);
  };

  emailChange = e => {
    this.formFieldStringState('email', e);
  }

  passwordChange = e => {
    this.formFieldStringState('password', e);
  }


  formSubmit = (e) => {
    e.preventDefault();
    const userInformation = { ...this.state.newCustomerInformation };
    this.signUp(userInformation);
    this.setState({ newCustomerInformation: customerInformation });
  }

  render() {
    const { newCustomerInformation } = this.state;
    console.log(newCustomerInformation);
    return (
      <div className="container">
        <div className="Register" id="register-form">

          <FormGroup className="form-horizontal col-offset-3">
            <Label htmlFor="inputName" className="col-lg-12 m-1 control-label">
              First Name:
              </Label>
            <div className="registerEmailInput col-lg-12 mb-2">
              <Input
                type="name"
                className="form-control"
                id="inputEmail"
                placeholder="First Name"
                value={newCustomerInformation.firstName}
                onChange={this.firstNameChange}
              />
            </div>
            <Label htmlFor="inputLastName" className="col-lg-12 m-1 control-label">
              Last Name:
              </Label>
            <div className="col-lg-12 mb-2">
              <Input
                type="name"
                className="form-control"
                id="inputEmail"
                placeholder="Last Name"
                value={newCustomerInformation.lastName}
                onChange={this.lastNameChange}
              />
            </div>
            <Label htmlFor="inputEmail" className="col-lg-12 m-1 control-label">
              Email:
              </Label>
            <div className="col-lg-12 mb-2">
              <Input
                type="email"
                className="form-control"
                id="inputEmail"
                placeholder="Email"
                value={newCustomerInformation.email}
                onChange={this.emailChange}
              />
              <FormText>Please use a valid email address.</FormText>
            </div>
            <label htmlFor="inputPassword" className="col-lg-12 m-1 control-label">
              Password:
              </label>
            <div className="col-lg-12 mb-2">
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                placeholder="Password"
                value={newCustomerInformation.password}
                onChange={this.passwordChange}
              />
              <FormText>Your password should be longer than 8 characters.</FormText>
            </div>
            <div className="col-sm-12 mb-2">
              <Button
                type="submit"
                className="btn btn-default col-xs-12"
                onClick={this.formSubmit}
              >
                Submit
                </Button>
            </div>
            <div className="col-sm-12 mb-3 p-2 text-center">
              <div className="alreadyAccount">Already have an account?</div>
              <Link to="/login"><Button className="mb-2">Return To Login</Button></Link>
            </div>
          </FormGroup>
        </div>
      </div>
    );
  }
}

export default Register;