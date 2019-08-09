import React from 'react';
import userFavoriteRequest from '../../Data/userFavoriteRequest';
import formationRequest from '../../Data/formationRequest';
import userRequests from '../../Data/UserRequest';
import { Button } from 'reactstrap';
import favoriteBanner from '../../Images/YourFavorites.png';
import './Profile.scss';


class Profile extends React.Component {
  state = {
    formations: [],
    userFavs: [],
    user: {},
  }

  componentDidMount() {
    this.getUser();
  }

  getAllFavorites = (user) => {
    userFavoriteRequest.getUserFavoriteRequest()
      .then((favs) => {
        const userFavs = favs.filter(fav => user.id === fav.userId)
        this.setState({ userFavs });
        this.getFormations(userFavs);
      })
      .catch(err => console.error('error with getting users', err));
  }

  getUser = () => {
    userRequests.getUserByEmail()
      .then((user) => {
        this.setState({ user });
        this.getAllFavorites(user);
      })
      .catch(err => console.error('error with getting users', err));
  }

  getFormations = (userFavs) => {
    if(userFavs.length > 0) {
      const formationArray = [];
      userFavs.forEach((userFav) => {
        formationRequest.getSingleFormation(userFav.formationId)
          .then((formation) => {
            formationArray.push(formation);
            if (formationArray.length === userFavs.length) {
              this.setState({ formations: formationArray });
            }
          })
          .catch()
      })
    }
    else 
    {
      this.setState({formations: userFavs})
    }
  }
      


  deleteUserFavorite = (e) => {
    const deleteFav = e.target.id;
    const user = {...this.state.user};
    userFavoriteRequest.deleteUserFavorite(deleteFav)
      .then(() => {
        this.getAllFavorites(user);
      })
      .catch(err => console.error('error with favorite delete', err));
  }

  render() {
    const formations = [...this.state.formations];

    const formationsComponent = formations.map(formation => (
      <div key={formation.id}>
        <div className='formation-div'>
          <div className='card favorite-formation'>
            <p>{formation.formationName}</p>
            <p>{formation.location}</p>
            <p>{formation.formed}</p>
            <Button id={formation.id} className='btn delete-me' onClick={this.deleteUserFavorite}>DELETE</Button>
          </div>
        </div>
      </div>
    ));

    return (
      <div>
      <div className='title'><img className='favorite-banner' src={favoriteBanner} alt='favorite-banner'></img></div>
        <div className='flex-div'>
          {formationsComponent}
        </div>
      </div>
    )
  }
}

export default Profile 
