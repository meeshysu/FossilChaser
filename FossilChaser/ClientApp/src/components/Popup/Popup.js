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
        <div className='popup-style1'>
          <b>{formation.formationName}</b>
        </div>
        <div className='popup-surprise'>
          <i>{formation.formed}</i>
        </div>
        <div className='popup-style2'>
          {formation.location}
        </div>
        <div className='popup-style3'>
          <u>Fossils discovered:</u>   {formation.fossil}
        </div>
        <StarButton className='starbutton' key={formation.id} formation={formation}></StarButton>
      </Popup>
    )
  }
}

export default MyPopup