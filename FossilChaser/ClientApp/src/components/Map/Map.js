import React from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import FormationRequest from '../../Data/FormationRequest';
import './Map.scss';


class Map extends React.Component {
  state = {
    formations: [],
  }
  
  showFormations = () => {
    FormationRequest.getRequest()
    .then((data) => {
      this.setState({ formations: data });
    })
    .catch(err => console.error('error with getting formations', err));
  }

  componentDidMount(){
    this.showFormations();
  }

  formationItemComponent = () => {
    const { formations } = this.state;  
    const formationCreation = formations.map(formation => (
      <Marker
      key={formation.id}
      position={[formation.latitude, formation.longitude]}
      >
      <Popup className='pop-up'>
      id={formation.id}
      formation={formation.formationName}
      founder={formation.founder}
      region={formation.region}
      state={formation.state}
      country={formation.country}
      >
      </Popup>
      </Marker>
  
    ));
    return formationCreation;
  }

  render() {
    return (
      <div className = "map-container">
      <LeafletMap
        center={[50.761667, -111.485]}
        zoom={2}
        maxZoom={17}        attributionControl={true}
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
  }
}


export default Map;