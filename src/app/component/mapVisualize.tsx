import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
})

interface MapVisualizeProps {
    geoJSONData: any
  }

const MapVisualize: React.FC<MapVisualizeProps> = (geoJSONData : any) => {
    useEffect(() => {
        if (geoJSONData.geoJSONData) {
          const map = L.map('map').setView([0, 0], 3);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(map);
          L.geoJSON(geoJSONData.geoJSONData).addTo(map);
          map.fitBounds(L.geoJSON(geoJSONData.geoJSONData).getBounds());
        }
      }, [geoJSONData]);

  return (
    <div>
      <div id="map" style={{ height: '800px' }} />
      {geoJSONData.geoJSONData && (
        <div>
          <h2>GeoJSON Data:</h2>
          <pre>{JSON.stringify(geoJSONData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default MapVisualize;
