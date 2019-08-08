import React from 'react';
import {
  Button,
  Container,
} from 'reactstrap';
import authRequests from '../../Data/authRequest';
import Logo from '../../Images/FossilChaser2.png';
import Login from '../../Images/LoginTrilo.png';

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
              <img className="logo" src={Logo} alt='logo'></img>
                    <div className="login-button">
                        <button
                        type="submit"
                        className="btn col-xs-12 mr-2"
                        onClick={this.loginClickEvent}
                        color="primary"
                        >
                        <img className='login' src={Login} alt='login'></img>
                        </button>
                    </div>
            </Container>
      );
    }
}

export default Auth;