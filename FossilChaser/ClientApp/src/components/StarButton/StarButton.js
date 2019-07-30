import React from 'react';
import PropTypes from 'prop-types';
import favFormationRequest from '../../Data/favoriteRequest';
import './StarButton.scss';

class StarButton extends React.Component {
  state =
    {
      favoriteFormations: [],
    }

  static propTypes = {
    isFavorite: PropTypes.bool,
    changeIsFavState: PropTypes.func,
    formationId: PropTypes.number,
    userId: PropTypes.number,
  }


  getAllFavoriteFormations = () => {
    favFormationRequest.getAllFavFormations()
      .then((favoriteFormations) => {
        this.setState({ favoriteFormations });
      });
  }

  componentDidMount() {
    this.getAllFavoriteFormations();
  }

  changedStateForFavorite = () => {
    const { changeIsFavState } = this.props;
    this.addFavoriteFormationsToUser();
    changeIsFavState();
  };

  addFavoriteFormationsToUser = () => {
    const { userId, favoriteId, isFavorite } = this.props;
    const usersFavoriteFormation = {
      userId,
      favoriteId,
    };
    if (!isFavorite) {
      favFormationRequest.createFavoriteFormation(usersFavoriteFormation)
        .then((favFormation) => {
          this.setState({ currentFavFormation: favFormation.data });
        });
    } else {
      this.deleteFavoriteFormations();
    }
  }

  deleteLikedProperties = () => {
    const { userId, favoriteId } = this.props;
    favFormationRequest.getAllFavFormations()
      .then((favoriteFormations) => {
        const filterMatchingFormation = favoriteFormations.filter(lp => lp.userId === userId && lp.favoriteId === favoriteId);
        const favoriteFormationId = filterMatchingFormation[0].id;
        favFormationRequest.deleteFavorite(favoriteFormationId)
          .then(() => {
          });
      });
  }

  render() {
    const { isFavorite } = this.props;
    const clickToFavoriteButton = () => {
      if (isFavorite === false) {
        return (
          <button className="btn" onClick={this.changedStateForFavorite}><i id="!isLiked" className="far fa-star" /></button>
        );
      }
      return (
        <button className="liked-button" onClick={this.changedStateForFavorite}><i id="isLiked" className="fas fa-star"></i></button>
      );
    };
    return (
      <div className="liked-formation">{clickToFavoriteButton()}</div>
    );
  }
}

export default StarButton;