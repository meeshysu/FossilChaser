import React from 'react';
import {
  Button,
  Container,
} from 'reactstrap';
import firebase from 'firebase';
import authRequests from '../../Data/authRequest';
import './Auth.scss';

class Auth extends React.Component {
    loginClickEvent = () => {
      //e.preventDefault();
      authRequests
        .loginUser()
        .then(() => {
          this.props.history.push('/Map');
        })
        .catch((error) => {
          console.error('login not successful', error);
        });
    };

    render() {
      return (
            <Container className="Login">
                    <div className="">
                        <Button
                        type="submit"
                        className="btn col-xs-12 mr-2"
                        onClick={this.loginClickEvent}
                        color="primary"
                        >
                        Login
                        </Button>
                    </div>
            </Container>
      );
    }
}

export default Auth;