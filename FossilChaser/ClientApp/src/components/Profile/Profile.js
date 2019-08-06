import React from 'react';
import userFavoriteRequest from '../../Data/userFavoriteRequest';
import formationRequest from '../../Data/formationRequest';
import userRequests from '../../Data/UserRequest';

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
        this.getAllFavorites(user)
      })
      .catch(err => console.error('error with getting users', err));
  }

  getFormations = (userFavs) => {
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

  render() {
    const formations = [...this.state.formations];

    const formationsComponent = formations.map(formation => (
    <div key={formation.id}>
      <div className='formation-div'>
      <p>{formation.formationName}</p>
      <p>{formation.location}</p>
      </div>
    </div>
    ));

    return (
      <div>
      <h1>Your Favorite Formations</h1>
      {formationsComponent}
      </div>
    )
  }
}

export default Profile 
