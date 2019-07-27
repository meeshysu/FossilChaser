import React from 'react';
import userRequests from '../../Data/userRequest';
import authRequests from '../../Data/authRequest';
import './Home.scss';

const defaultUser = {
  username: '',
  email: '',
};

class Home extends React.Component {
  state = {
    user: defaultUser,
  }

  componentDidMount() {
    this.newUserSetup();
  }

  newUserSetup = () => {
    userRequests.getUserByEmail()
      .then((result) => {
        if (result === undefined) {
          const user = { ...this.state.user };
          const email = authRequests.getUserEmail();
          user.username = email;
          user.email = email;
          userRequests.addUser(user);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
        <h1>Home Page</h1>
      </div>
    );
  }
}

export default Home;