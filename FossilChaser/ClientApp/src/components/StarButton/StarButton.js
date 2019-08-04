import React from 'react';
import PropTypes from 'prop-types';
import favoriteRequest from '../../Data/favoriteRequest';
import authRequests from '../../Data/authRequest';
import userRequests from '../../Data/UserRequest';
import userFavoriteRequest from '../../Data/userFavoriteRequest';
import formationRequest from '../../Data/formationRequest';
import './StarButton.scss';
import { auth } from 'firebase';



class StarButton extends React.Component {
  state =
    { 
      user: '',
      formation: '',
      favorite: '',
      isFavorite: false,
    }

  
  setUserState = () => {
    userRequests.getUserByEmail()
      .then((user) => {
        this.setState({ user });
        console.log(user);
      })
      .catch((error) => {
        console.error(error);
      });
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
    })
  }

  addToFavorite = () => {
    const { user } = this.state;
    const { formation } = this.props;
    this.setState({ isFavorite: true })
    const AddAUserFavorite = { 
      userId: user.id,
      formationId: formation.id,
    }
    userFavoriteRequest.postUserFavoriteRequest(AddAUserFavorite).then(result => console.log(result));
    formationRequest.createFormation(AddAUserFavorite).then(result => console.log(result));
  }

  render() {
    const { isFavorite } = this.props;
    const clickToFavoriteButton = () => {
      if (isFavorite === false) {
        return (
          <button className="btn" onClick={this.addToFavorite}><i id="!isFavorite" className="far fa-star" /></button>
        );
      }
      return (
        <button className="liked-button" onClick={this.addToFavorite}><i id="isFavorite" className="fas fa-star"></i></button>
      );
    };
    return (
      <div className="liked-formation">{clickToFavoriteButton()}</div>
    );
  }
}


export default StarButton