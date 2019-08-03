import React from 'react';
import './Profile.scss';
import userRequests from '../../Data/UserRequest';
import MyPopop from '../../components/Popup/Popup';
import MyPopup from '../../components/Popup/Popup';

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
    const { formation } = this.state;

    return (
      <div>
        <h1>Profile Page</h1>
        <MyPopup
        formation={formation}
        />
      </div>
    );
  }
}

export default Profile;