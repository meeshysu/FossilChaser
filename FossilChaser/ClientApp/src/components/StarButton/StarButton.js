import React from 'react';
import authRequests from '../../Data/authRequest';
import userRequests from '../../Data/UserRequest';
import userFavoriteRequest from '../../Data/userFavoriteRequest';
import formationRequest from '../../Data/formationRequest';
import {Button} from 'reactstrap';
import './StarButton.scss';


class StarButton extends React.Component {
  state =
    { 
      user: '',
      formation: '',
      favorite: '',
      buttonTextChange: <i class="far fa-star"></i>
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
    this.setState({ buttonTextChange: <i class="fas fa-star"></i>});
    const AddAUserFavorite = { 
      userId: user.id,
      formationId: formation.id,
    }
    userFavoriteRequest.postUserFavoriteRequest(AddAUserFavorite).then(result => console.log(result));
    formationRequest.createFormation(AddAUserFavorite).then(result => console.log(result));
  }

  render() {
    const { isFavorite } = this.props;
    return (
      <Button className="addToCart btn-sm" onClick={this.addToFavorite}>
      {this.state.buttonTextChange}
      </Button>    );
  }
}


export default StarButton