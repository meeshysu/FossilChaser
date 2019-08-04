import React from 'react';
import authRequests from '../../Data/authRequest';
import userFavoriteRequest from '../../Data/userFavoriteRequest';
import userRequests from '../../Data/UserRequest';
import MyPopup from '../Popup/Popup';


class Profile extends React.Component {
  state = {
    userFavorites: []
  }

  componentDidMount() {
    let uid = authRequests.getUid();
    this.userInfo();
    userRequests.getUserByEmail(uid).then((user) => {
      this.setState({ user });
    })
  }

  userInfo = () => {
    let uid = authRequests.getUid();
    userFavoriteRequest.getUserFavoriteRequest(uid).then((userFavorites) => {
      this.setState({ userFavorites });
    });
  }

  render() {
    const { userFavorites } = this.state;


    const userFavoriteComponent = userFavorites.map(userFavorite => (
      <div>

          userFavorite={userFavorite}
          key={userFavorite.id}

      </div>
    ));
    return (
      <div>{userFavoriteComponent}</div>
    )
  }
}

export default Profile 