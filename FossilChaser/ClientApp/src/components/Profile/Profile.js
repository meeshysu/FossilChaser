import React from 'react';
import { Label } from 'reactstrap';
import './Profile.scss';
import userRequests from '../../Data/userRequest';

const defaultUser = {
  id: 0,
  username: '',
  email: '',
};

class Profile extends React.Component {
  state = {
    user: defaultUser,
  }

  componentDidMount() {
    this.setUserState();
  }

  setUserState = () => {
    userRequests.getUserByEmail()
      .then((user) => {
        this.setState({ user });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onSubmit = (userObject) => {
    userRequests.updateUser(userObject)
      .then(() => {
        this.setUserState();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    //const { user } = this.state;

    return (
      <div>
        <h1>Profile Page</h1>
      </div>
    );
  }
}

export default Profile;