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
      <StarButton key={formation.id} formation={formation}></StarButton>
    </Popup>
  )
}
}

export default MyPopup