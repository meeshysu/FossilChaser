import React from 'react';
import { Popup } from 'react-leaflet';
import './Popup.scss';

class MyPopup extends React.Component {
state = {
  formations: [],
  isFavorite: true,
}



// popupItemComponent = () => {


// }

render() {
  const { formation } = this.props;

  return (
    <Popup className='pop-up'>
      <div className='popupDiv'>
        FormationName={formation.formationName}
        Location={formation.location}
      </div>
    </Popup>
  )
}
}

export default MyPopup