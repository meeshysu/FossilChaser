import React from 'react';
import PropTypes from 'prop-types';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import FormationRequest from '../../Data/FormationRequest';
import userRequests from '../../Data/UserRequest';
import authRequests from '../../Data/authRequest';
//import StarButton from '../StarButton/StarButton';

import './Map.scss';

const defaultUser = {
  username: '',
  email: '',
};

class Map extends React.Component {
  state = {
    formations: [],
    user: defaultUser,
    isFavorite: true
  }

  static propTypes = {
    changeIsFavState: PropTypes.func,
    getAllFavoriteFormations: PropTypes.func,
  }

  changeIsFavState = () => {
    const { isFavorite } = this.state;
    this.setState({ isFavorite: !isFavorite });
  }

  componentDidMount() {
    this.newUserSetup();
    this.showFormations();
    const { isFavorite } = this.state;
    if (isFavorite === false) {
      this.props.getAllFavoriteFormations();
    }
  }


newUserSetup = () => {
  userRequests.getUserByEmail()
    .then((result) => {
      if (result === undefined) {
        const user = { ...this.state.user };
        const email = authRequests.getUserEmail();
        user.username = email;
        user.email = email;
        userRequests.addUser(user);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

showFormations = () => {
  FormationRequest.getRequest()
    .then((data) => {
      this.setState({ formations: data });
    })
    .catch(err => console.error('error with getting formations', err));
}

formationItemComponent = () => {
  const { formations, isFavorite } = this.state;
  const formationCreation = formations.map(formation => (
    <Marker
      key={formation.id}
      position={[formation.latitude, formation.longitude]}
    >
      <Popup className='pop-up'
        Founder={formation.founder}
        Region={formation.region}
        State={formation.state}
        Country={formation.country}
        //onClick={new StarButton(this.formationLikeStateChange)}
        >
      </Popup>
    </Marker>

  ));
  return formationCreation;
}

render() {
  return (
    <div className="map-container">
      <LeafletMap
        center={[50.761667, -111.485]}
        zoom={2}
        maxZoom={17}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
      >
        <TileLayer
          url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
        />

        {this.formationItemComponent()}

      </LeafletMap>
    </div>
  );
};
}

export default Map;