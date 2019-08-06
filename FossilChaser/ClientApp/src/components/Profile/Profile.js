import React from 'react';
import userFavoriteRequest from '../../Data/userFavoriteRequest';
import formationRequest from '../../Data/formationRequest';
import userRequests from '../../Data/UserRequest';
import { Button } from 'reactstrap';
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
          <div className='card favorite-formation'>
            <p>{formation.formationName}</p>
            <p>{formation.location}</p>
            <Button className='btn-sm delete-me'><i class="fab fa-pagelines"></i> DELETE</Button>
          </div>
        </div>
      </div>
    ));

    return (
      <div>
      <h1 className='title'>Your Favorite Formations</h1>
        <div className='flex-div'>
          {formationsComponent}
        </div>
      </div>
    )
  }
}

export default Profile 
