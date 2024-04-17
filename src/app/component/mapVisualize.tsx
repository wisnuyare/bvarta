import React, { useEffect, useRef } from 'react';
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
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current && geoJSONData.geoJSONData) {
      mapRef.current = L.map('map').setView([0, 0], 2);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);
    }

    if (geoJSONData.geoJSONData && mapRef.current) {
      const map = mapRef.current;
      const geojsonLayer = L.geoJSON(geoJSONData.geoJSONData, {
        onEachFeature: (feature, layer) => {
          layer.bindPopup(feature.properties.name);
        }
      }).addTo(map);
      map.fitBounds(geojsonLayer.getBounds());
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [geoJSONData]);

  return (
    <div>
      <div>
        <div className="rounded-lg overflow-hidden shadow-md m-4">
          <div id="map" style={{ height: '800px' }} />
        </div>
      </div>
      <div>
        {geoJSONData.geoJSONData && (
          <div className="grid grid-cols-2 gap-2 mx-2">
            {geoJSONData.geoJSONData.features.map((feature: any, index: number) => (
              <div key={index} className="bg-gray-100 text-black p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-2">{feature.properties.name}</h2>
                <p><strong>Latitude:</strong> {feature.geometry.coordinates[1]}</p>
                <p><strong>Longitude:</strong> {feature.geometry.coordinates[0]}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MapVisualize;
