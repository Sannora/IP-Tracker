import "./Map.css";
import "leaflet/dist/leaflet.css";
import { useContext, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import earthGlobe from "../../assets/earth-globe.png";
import QueryContext from "../../Context/QueryContext";
import locationIconImg from "../../assets/icon-location.svg";

function Map() {
  const customLocationIcon = L.icon({
    iconUrl: locationIconImg,
    iconSize: [35, 45],
    iconAnchor: [17, 45],
  });

  const [mapCenter, setMapCenter] = useState([51.505, -0.09]);
  const [isLoading, setIsLoading] = useState(true);
  const { clientData, responseData } = useContext(QueryContext);

  useEffect(() => {
    if (clientData.lat && clientData.lng) {
      setMapCenter([clientData.lat, clientData.lng]);
      setIsLoading(false);
    }
    if (responseData.lat && responseData.lng) {
      setIsLoading(true);
      setMapCenter([responseData.lat, responseData.lng]);
      setIsLoading(false);
    }
  }, [clientData, responseData]);

  return (
    <>
      {isLoading ? (
        <div className="loading">
          <div className="globe-container">
            <img src={earthGlobe} alt="" className="globe-image" />
          </div>
        </div>
      ) : (
        <MapContainer
          className="map-container"
          center={mapCenter}
          zoom={13}
          scrollWheelZoom={true}
          key={mapCenter.join(",")}
        >
          <TileLayer
            attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={mapCenter} icon={customLocationIcon}></Marker>
        </MapContainer>
      )}
    </>
  );
}

export default Map;
