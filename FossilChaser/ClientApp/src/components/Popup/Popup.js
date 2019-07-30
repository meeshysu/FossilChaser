import React from 'react';
import PropTypes from 'prop-types';
import { Popup } from 'react-leaflet';
import StarButton from '../StarButton/StarButton';
import './Popup.scss';

class MyPopup extends React.Component {
state = {
  formations: [],
  isFavorite: true,
}

static propTypes = {
  clickToFavoriteButton: PropTypes.func,
}

componentDidMount() {
  const { isFavorite } = this.state;
  if (isFavorite === false) {
    this.props.getAllFavoriteFormations();
  }
}

changeIsFavState = () => {
  const { isFavorite } = this.state;
  this.setState({ isFavorite: !isFavorite });
}

 starButtonEvent = () => {
  StarButton.clickToFavoriteButton();
 }

render() {
  const { formation } = this.props;

  return (
    <Popup className='pop-up'>
      <div className='popupDiv'>
        FormationName={formation.formationName}
        Location={formation.location}
        
      </div>
      <StarButton clickToFavoriteButton={this.props.clickToFavoriteButton}></StarButton>
    </Popup>
  )
}
}

export default MyPopup