import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.scss';


class Map extends React.Component {

  componentDidMount() {
    this.map = L.map('map', {
      center: [51.505, -0.09],
      zoom: 6,
      zoomControl: false
    });

    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      detectRetina: true,
      maxZoom: 20,
      maxNativeZoom: 17
    }).addTo(this.map);
  }

  render() {
    const {componentDidMount} = this.props;
    return  (
      <div id = "map">
        {componentDidMount}
      </div>
    )
  }
}

export default Map