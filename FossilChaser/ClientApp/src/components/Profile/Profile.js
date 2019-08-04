import React from 'react';
import authRequests from '../../Data/authRequest';
import userFavoriteRequest from '../../Data/userFavoriteRequest';
import formationRequest from '../../Data/formationRequest';
import userRequests from '../../Data/UserRequest';
import MyPopup from '../Popup/Popup';


class Profile extends React.Component {
  state = {
    formations: [],
    userFavs: []
  }

  componentDidMount() {
    this.getAllFavorites();
    this.getUser();
  }

  getAllFavorites = () => {
    userFavoriteRequest.getUserFavoriteRequest()
    .then((userFavs) => {
      this.setState({ userFavs });
      console.log(userFavs)
    })
    .catch(err => console.error('error with getting users', err));
  }

  getUser = () => {
    userRequests.getUserByEmail()
      .then((user) => {
        this.setState({ user });
      })
      .catch(err => console.error('error with getting users', err));
  }

  render() {
    const { userFavs } = this.state;

    // const userFavoriteComponent = userFavs.map(userFav => (
    //   <div key={userFav.id}>
       
    //    userFavorite={userFav}
        
    //   </div>
    // ));
    return (
      <div>
      <div>Stupid shit</div>
      {/* <p>{userFavoriteComponent}</p> */}
      </div>
    )
  }
}

export default Profile 
